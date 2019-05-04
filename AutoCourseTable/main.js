function init() {
    $("#courseTable").append("<thead><tr><th>場次</th><th>時間</th><th>主題</th></tr></thead>");
    
    var topicCount = topic.length;
    
    var secondUnit = 1000;
    var minuteUnit = secondUnit * 60;
    var hourUnit = minuteUnit * 60;
    var dayUnit = hourUnit * 24;
    $("#courseTable").append("<tbody>");
    for(var x=0;x<topicCount;x++)
    {
        /*
        $("#courseTable").append("<tr>");
        $("#courseTable").append("<td>"+(x+1)+"</td>");
        $("#courseTable").append("<td>"+(new Date(startDate.getTime()+7*x*dayUnit)).toLocaleDateString()+"</td>");
        $("#courseTable").append("<td>"+topic[x]+"</td>");
        $("#courseTable").append("</tr>");
        */
        
        $("#courseTable > tbody:last-child").append("<tr>");
        $("#courseTable > tbody:last-child > tr:last-child").append("<td>"+(x+1)+"</td>");
        $("#courseTable > tbody:last-child > tr:last-child").append("<td>"+(new Date(startDate.getTime()+7*x*dayUnit)).toLocaleDateString().slice(5)+"</td>");
        $("#courseTable > tbody:last-child > tr:last-child").append("<td>"+topic[x]+"</td>");
        $("#courseTable > tbody:last-child > tr:last-child").append("</tr>");

        if(topic[x].includes("停課") || topic[x].includes("不上課") || topic[x].includes("連假")){
            $("#courseTable > tbody:last-child > tr:last-child").css("color","gray");
        }
        
    }
    $("#courseTable").append("</tbody>");
}

var startDate = new Date();

function setMonthAndDay(startYear, startMonth, startDay)
{
	startDate.setFullYear(startYear)
    startDate.setMonth(startMonth-1,startDay);
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}

setMonthAndDay(2019, 2, 23);

$(document).ready(init());

$("#addTopic").click(function() {
	var theTopic = $("#theTopic").val();
	if(theTopic != "") {
		topic.push(theTopic);
		$("#courseTable").empty();
		init();
	}
	else{
		alert(theTopic + "請輸入課程主題");
	}
});

$("#remove").click(function() {
	topic.pop();
	$("#courseTable").empty();
	init();
});

$("#setDate").click(function(){
	var day = $("#date").val().slice(8);
	var month = $("#date").val().slice(5,7);
	var year = $("#date").val().slice(0,4);
	setMonthAndDay(year, month, day);
	$("#courseTable").empty();
	init();
});
