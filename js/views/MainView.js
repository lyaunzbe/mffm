var PlaylistView = require('./PlaylistView'),
    PlayerView   = require('./PlayerView');

var MainView = Backbone.View.extend({
  el: '.main',
  render: function(){
    // this.PlayerView = new PlayerView({})
    this.PlaylistView = new PlaylistView({playlist: this.Playlist});
  },
  initialize: function(opts){
    this.Playlist = opts.playlist;
  }
});

module.exports = MainView;