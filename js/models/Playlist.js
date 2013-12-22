var Playlist = Backbone.Model.extend({
  defaults: {
    index: 0,
    status: -1 //-1 Stopped, 0 Paused, 1 Playing,
  },
  initialize: function(argument) {
    // body...
  }
});

module.exports = _.extend(Playlist, Backbone.Events);
