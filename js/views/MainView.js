var PlaylistView = require('./PlaylistView'),
    PlayerView   = require('./PlayerView');

var MainView = Backbone.View.extend({
  el: '.main',
  render: function(){
    this.PlayerView = new PlayerView({
      playlist: this.Playlist,
      streams: this.Streams
    });
    
    this.PlaylistView = new PlaylistView({
      playlist: this.Playlist
    });
    this.PlaylistView.render();

  },
  initialize: function(opts){
    this.Playlist = opts.playlist,
    this.Streams = opts.streams;

  }
});

module.exports = MainView;