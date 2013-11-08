var Stream = require('../models/stream');

var Streams = Backbone.Collection.extend({
  model: Stream,

  localStorage: new Backbone.LocalStorage('mffm-streams')
});

module.exports = _.extend(Streams, Backbone.Events);