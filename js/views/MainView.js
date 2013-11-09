var PlaylistView = require('./PlaylistView'),
    PlayerView   = require('./PlayerView');

var MainView = Backbone.View.extend({
  el: '.main',
  render: function(){
    console.log(this.Playlist);

    this.PlaylistView.render();

  },
  initialize: function(opts){
    console.log('init MainView');
    this.Playlist = opts.playlist,
    this.Streams = opts.streams;

    this.PlayerView = new PlayerView({
      playlist: this.Playlist,
      streams: this.Streams
    });

    this.PlaylistView = new PlaylistView({
      playlist: this.Playlist
    });
  }
});

module.exports = MainView;