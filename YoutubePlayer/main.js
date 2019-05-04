var player; //播放器
var currentPlay = 0; //第幾首

//API準備完成
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player",
    {
        height: "390",
        width: "640",
        videoId: playList[currentPlay],
        playerVars:
        {
            "autoplay": 0,   //自動播放
            "controls": 1,   //控制選項
            "start": playTime[currentPlay][0],   //開始秒數
            "end": playTime[currentPlay][1],     //結束秒數
            "showinfo": 0,   //影片標題
            "rel": 0,    //結束時顯示相關影片
            "iv_load_policy": 3  //顯示置入性行銷連結
        },
        events:
        {
            "onReady": onPlayerReady,
            "onStateChange": onPlayerStateChange
        }
    });
}

//播放器準備完成
function onPlayerReady(event) {
    $("#playButton").click(function() {
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

//播放器狀態改變
function onPlayerStateChange(event) {
    //播放結束
    if(event.data == 0 && (Math.floor(player.getCurrentTime()) == playTime[currentPlay][1]))
    {
        //下一首
        if(currentPlay < playList.length - 1)
        {
            currentPlay++;
            player.loadVideoById({
                "videoId": playList[currentPlay],
                "startSeconds": playTime[currentPlay][0],
                "endSeconds": playTime[currentPlay][1],
                "suggestedQuality": "large"
            });
        }
        else    //最後一首
        {
            currentPlay = 0;           
            player.cueVideoById({
                "videoId": playList[currentPlay],
                "startSeconds": playTime[currentPlay][0],
                "endSeconds": playTime[currentPlay][1],
                "suggestedQuality": "large"
            });
        }
        console.log(currentPlay);
    }
    if(player.getVideoLoadedFraction() > 0)
    {
        $("h2").text(player.getVideoData().title);
    }
        
}