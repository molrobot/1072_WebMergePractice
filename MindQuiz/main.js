$(document).ready(function() {
	//是否已開始作答
	var currentQuiz = null;
	$("#startButton").click(function() {
		if(currentQuiz == null) {
			//作答到第0題
			currentQuiz = 0;
			//顯示題目
			$("#question").text(questions[0].question);
			//清空
			$("#options").empty();
			
			//新增選項
			for(var x=0;x<questions[0].answers.length;x++)
			{
				$("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[0].answers[x][0]+"</label><br><br>");
			}
			$("#startButton").attr("value","Next");
		}
		else{
			$.each($(":radio"),function(i,val) {
				if(val.checked)
				{
					//是否有最終結果
					if(isNaN(questions[currentQuiz].answers[i][1])) {
						//通往最終結果
						var finalResult = questions[currentQuiz].answers[i][1];
						//顯示最終結果標題
						$("#question").text(finalAnswers[finalResult][0]);
						//選項清空
						$("#options").empty();
						//顯示結果內容
						$("#options").append(finalAnswers[finalResult][1]+"<br><br>");
						//清空作答記錄
						currentQuiz = null;
						$("#startButton").attr("value","重新開始");
					}
					else{
						//指定下一題
						currentQuiz=questions[currentQuiz].answers[i][1] - 1;
						//顯示新題目
						$("#question").text(questions[currentQuiz].question);
						//清空選項
						$("#options").empty();
						//顯示新選項
						for(var x=0;x<questions[currentQuiz].answers.length;x++)
						{
							$("#options").append("<input name='options' type='radio' value="+x+">"+"<label>"+questions[currentQuiz].answers[x][0]+"</label><br><br>");
						}
					}
					return false;
				}
			});
		}
	});
});