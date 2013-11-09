var JST = require('../util/templates');

var PlayerView = Backbone.View.extend({
  el: '.player',

  events : {
    'click .controls i.fa-play' : 'onPlay',
    'click .controls i.fa-pause' : 'onPause',
    // 'click .controls i.fa-fast-forward' : 'onFF',
    // 'click .controls i.fa-fast-backward' : 'onFB'
    'click .track-progress' : 'onSeek'

  },

  template: JST['player'],
  render: function(){
    this.$el.empty();

    this.$el.append(this.template);
  },
  initialize: function(opts){
    var self = this;
    this.Playlist = opts.playlist;
    this.listenTo(this.Playlist, 'playlistSelection', this.playlistSelection);


    if(!Players.yt){
      Players.yt = new YT.Player('stereo', {
        events: {
          'onReady': self.onYTPlayerReady.bind(self),
          'onStateChange': self.onYTPlayerStateChange.bind(self),
        }    
      });
    }else{
      var tracks = this.Playlist.get('tracks');
      Players.yt.cueVideoById(tracks[0].id);
      this.render();
    }
  },

  onPlay: function(e){
    var yt    = Players.yt;

    yt.playVideo();
    this.Playlist.set('status', 1);

    var ctrl = $(e.currentTarget);
    ctrl.removeClass('play fa-play');
    ctrl.addClass('pause fa-pause');
  },

  onPause: function(e){
    var yt    = Players.yt;

    yt.pauseVideo();
    this.Playlist.set('status', 0);

    var ctrl = $(e.currentTarget);
    ctrl.removeClass('pause fa-pause');
    ctrl.addClass('play fa-play');
  },


  onYTPlayerReady: function(e){
    this.render();
    this.Playlist.trigger('playerLoaded');
    Players.yt = e.target,
        tracks = this.Playlist.get('tracks');
    yt = Players.yt;

    yt.cueVideoById(tracks[0].id);
  },

  onYTPlayerStateChange: function(e){
    var self = this;
    var trackProgress = function(){
      var yt = Players.yt;

      var progress = (yt.getCurrentTime() / yt.getDuration()) * 100;
      var width = $('.track-progress .slider').css('width', progress+'%');
    }

    console.log(e.data);

    switch(e.data){
      case -1:
        Pace.restart();
        Pace.start({ ghostTime:500});
      case 1:

        setInterval(trackProgress,200);
        break;
      case 2:
        clearInterval(trackProgress);
        break;
    }
  },

  playlistSelection: function(){
    var yt    = Players.yt,
        index = this.Playlist.get('index'),
        tracks = this.Playlist.get('tracks');

    yt.loadVideoById(tracks[index].id);
    this.Playlist.set('status', 1);
    this.$el.find('i.fa-play')
      .removeClass().addClass('pause fa fa-pause');
  },

  onSeek: function(e){
    var status = this.Playlist.get('status');
    if(status != -1){
      var yt = Players.yt,
          parentOffset = $(e.currentTarget).parent().offset();


     //or $(this).offset(); if you really just want the current element's offset
      var raw = (e.pageX - parentOffset.left)-30,
          progress = (raw/600) * 100;

      var time = (progress*yt.getDuration()) / 100;

      yt.seekTo(time);
      var width = $('.track-progress .slider').css('width', progress+'%');

    }
  
  }
});

module.exports = PlayerView;