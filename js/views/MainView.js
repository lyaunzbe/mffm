var PlaylistView = require('./PlaylistView'),
    PlayerView   = require('./PlayerView');

var MainView = Backbone.View.extend({
  el: '.main',
  render: function(){
    console.log(this.Playlist);

    this.PlaylistView.render();

  },
  initialize: function(opts){
    this.Player = opts.player;
    this.Playlist = opts.playlist,
    this.Streams = opts.streams;

    this.PlayerView = new PlayerView({
      playlist: this.Playlist,
      streams: this.Streams,
      player: this.Player
    });

    this.PlaylistView = new PlaylistView({
      playlist: this.Playlist,
      player: this.Player
    });
  }
});

module.exports = MainView;
