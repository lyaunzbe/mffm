var Player = Backbone.Model.extend({
  defaults: {
    status: -1, //-1 Stopped, 0 Paused, 1 Playing
    activeTrack: null,
    stream: null
  },
  initialize: function(argument) {
    // body...
  }
});

module.exports = _.extend(Player, Backbone.Events);
