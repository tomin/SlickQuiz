// Put all your page JS here

$(function () {

    var options = {
        perQuestionResponseMessaging: false,
		completionResponseMessaging: true,
		backButtonText: "←",
		nextQuestionText: "下一題",
		tryAgainText: "再試一次",
		randomSortQuestions: true,
		skipStartButton: true,
		onCompletion: function() {
			$(".ans").each(function(){
				var _this = $(this),
					ans = _this.data("ans"),
					li = _this.parents('.question').find('li'),
					classCorrect = 'correct_ans';
								
				if (ans.match(/A/)) {
					li.eq(0).addClass(classCorrect);
				}
				if (ans.match(/B/)) {
					li.eq(1).addClass(classCorrect);
				}
				if (ans.match(/C/)) {
					li.eq(2).addClass(classCorrect);
				}
				if (ans.match(/D/)) {
					li.eq(3).addClass(classCorrect);
				}				
			});
			
			var name = $("#company_name").val(),
				id = $("#company_id").val().replace(/\D+/g, '');
			
			if (name.length > 0) {
				$("#quiz_name").html("<em>" + name + "</em>, ");
			}
			if (id.length > 0) {
				$("#quiz_id").html("編號 " + id + ", ");
			}
			
		}
    };
	
	function loadQuiz() {
		$.ajax({
			url: "data/" + $("#quiz_item").val() + ".csv",
			dataType: "text",
			success: function( csv, a ) {
				var arrays = $.csv.toArrays(csv),
					testlength = $("#quiz_total").val();

				if (testlength > arrays.length) {
					testlength = arrays.length;
				}
														
				for(var i=0, len=testlength ; i<len; i++) {
					var obj = {},
						ans = arrays[i][0],
						map = {
							"A" : 0,
							"B" : 1,
							"C" : 2,
							"D" : 3,
						};
						
					obj["q"] = arrays[i][1] + "?",
					obj["correct"] = "<p><span>答對了！</span></p>",
					obj["incorrect"] = "<p><span>錯了！</span> 答案是<em class='ans' data-ans='" + ans + "'>" + ans + "</em></p>",
					obj["a"] = [
						{
						  "option": arrays[i][2],      
						  "correct": false
						},
						{
						  "option": arrays[i][3],      
						  "correct": false
						},
						{
						  "option": arrays[i][4],      
						  "correct": false
						},
						{
						  "option": arrays[i][5],      
						  "correct": false
						}					
					];
					
					if (ans.length == 1) {
						//single choice
						obj["a"][map[ans]].correct = true;				
					} else {
						//multiple choices
						var ansArr = ans.split(".");
						for(var j=0, anslen=ansArr.length; j<anslen; j++) {
							obj["a"][ map[ ansArr[j] ] ].correct = true;
						}
						 
					}
					quizJSON['questions'].push(obj);
				}
				$('#slickQuiz').slickQuiz(options);
			}

		});	
	}

	$(".start").click(function() {
		loadQuiz();
		return false;
	});


});
