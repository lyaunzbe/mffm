JST = JST = require('../util/templates');

var PlaylistView = Backbone.View.extend({
  el: '.playlist',

  template: JST['playlist'],
  render: function(){
    var playlist = {items: this.Playlist.toJSON().tracks};
    console.log(playlist);
    this.$el.empty();
    this.$el.append(this.template(playlist));
  },
  initialize: function(opts){
    this.Playlist = opts.playlist;
    this.render();
  }
});

module.exports = PlaylistView;