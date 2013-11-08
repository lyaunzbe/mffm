var YTPlayer = new YT.Player('stereo', {
  events: {
    onReady: function(e){

    },
    onStateChange: function(e){

    },
  }    
});

console.log(YTPlayer);
module.exports = YTPlayer;