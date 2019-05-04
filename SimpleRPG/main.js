var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy;
//mapArray:決定地圖中每個格子的元素
//ctx:html5 canvas用
//currentImgMainX,currentImgMainY:決定主角的所在座標
//imgMountain,imgMain,imgEnemy:障礙物、主角、敵人圖片物件

//網頁載入後開始執行
$(document).ready(function(){
	//遊戲地形設定
	//0:可走、1:障礙、2:終點、3:敵人
	mapArray = [0,1,1,0,0,0,3,1,2];
	ctx = $("#myCanvas")[0].getContext("2d");
	
	//擺上主角 - 使用預設位置
	imgMain = new Image();
	imgMain.src = "SimpleRPG/images/spriteSheet.png";
	currentImgMainX = 0;
	currentImgMainY = 0;
	imgMain.onload=function()
	{
		ctx.drawImage(imgMain, 0, 0, 80, 130, currentImgMainX, currentImgMainY, 200, 200);
	};
	
	//擺上障礙物與敵人
	imgMountain = new Image();
	imgMountain.src = "SimpleRPG/images/material.png";
	imgEnemy = new Image();
	imgEnemy.src = "SimpleRPG/images/Enemy.png";
	imgMountain.onload=function() {
		imgEnemy.onload=function() {
			for(var x in mapArray)
			{
				if(mapArray[x] == 1){
					ctx.drawImage(imgMountain, 32, 65, 32, 32, x % 3 * 200, Math.floor(x / 3) * 200, 200, 200);
				}
				else if(mapArray[x] == 3){
					ctx.drawImage(imgEnemy, 7, 40, 104, 135, x % 3 * 200, Math.floor(x / 3) * 200, 200, 200);
				}
			}	
		};
	};
});

//按下按鍵執行
$(document).keydown(function press(event){
	var targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
	//targetImgMainX、targetImgMainY:主角移動目標位置
	//targetBlock:主角移動目標編號
	//cutImagePositionX:依據主角方向決定圖片
	event.preventDefault();
	//避免點擊鍵盤出現瀏覽器其他行為
	//依據使用者點擊按鍵，計算目標位置、更新圖片
	switch(event.which) {
		case 37://往左走
			//console.log("left");
			targetImgMainX = currentImgMainX - 200;
			targetImgMainY = currentImgMainY;
			cutImagePositionX = 175;
			break;
		case 38://往上走
			//console.log("top");
			targetImgMainX = currentImgMainX;
			targetImgMainY = currentImgMainY - 200;
			cutImagePositionX = 355;
			break;
		case 39://往右走
			//console.log("right");
			targetImgMainX = currentImgMainX + 200;
			targetImgMainY = currentImgMainY;
			cutImagePositionX = 540;
			break;
		case 40://往下走
			//console.log("down");
			targetImgMainX = currentImgMainX;
			targetImgMainY = currentImgMainY + 200;
			cutImagePositionX = 0;
			break;
		default:
			return;
	}
	if(targetImgMainX <= 400 && targetImgMainX >= 0 && targetImgMainY <= 400 && targetImgMainY >= 0)
	{
		targetBlock = targetImgMainX / 200 + targetImgMainY / 200 * 3;
	}
	else
	{
		targetBlock = -1;
		//-1代表異常、不能動
	}
	
	ctx.clearRect(currentImgMainX, currentImgMainY, 200, 200);
	//清除主角原本所在位置
	if(targetBlock == -1 || mapArray[targetBlock] == 1 || mapArray[targetBlock] == 3)
	{
		//目標位置異常、遇到障礙物、遇到敵人都不能走，在原地
		//但稍後會依移動方向轉頭
	}
	else
	{
		$("#talkBox").text("");
		currentImgMainX = targetImgMainX;
		currentImgMainY = targetImgMainY;
	}
	ctx.drawImage(imgMain, cutImagePositionX, 0, 80, 130, currentImgMainX, currentImgMainY, 200 ,200);
	switch(mapArray[targetBlock]){
		case undefined://牆壁
			$("#talkBox").text("邊界");
			break;
		case 1://障礙
			$("#talkBox").text("有山");
			break;
		case 2://終點
			$("#talkBox").text("抵達終點!");
			break;
		case 3://有人
			$("#talkBox").text("嗨~");
			break;
	}
});

$("#bdown").click(function(){
    console.log(1);
	var e = $.Event("keydown");
	e.which = 40;
	$(document).trigger(e);
});
$("#bright").click(function(){
	var e = $.Event("keydown");
	e.which = 39;
	$(document).trigger(e);
});
$("#btop").click(function(){
	var e = $.Event("keydown");
	e.which = 38;
	$(document).trigger(e);
});
$("#bleft").click(function(){
	var e = $.Event("keydown");
	e.which = 37;
	$(document).trigger(e);
});