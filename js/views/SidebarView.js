var JST = require('../util/templates'),
    StreamCtrl = require('../util/StreamCtrl'),
    Streams = require('../collections/Streams'),
    Stream = require('../models/Stream');

var SidebarView = Backbone.View.extend({

  el: '.sidebar',
  template: JST['streamlist'],

  events: {
    "click .add-stream .add" : "addStreamClick",
    "keypress .add-stream input" : "addStreamKey",
    "click .streamlist li" : "streamClick" 
  },

  render: function(){
    var streams = {
      items:this.Streams.toJSON()
    };
    this.$el.find('.streamlist').remove();
    this.$el.find('.logo').after(this.template(streams));
    return this.$el;
  },

  initialize: function(){
    this.Streams = this.collection;
    if(this.Streams.length)
      this.Streams.first().set('active', true);
    this.listenTo(this.Streams, 'all', this.render);
  },

  addStreamClick : function(){
    var input = $('.add-stream input'),
        val   = input.val().trim().toLowerCase();
    if(val.length > 0) this.addStream(val);
  },

  addStreamKey: function(e){
    var input = $('.add-stream input');
    if(e.keyCode == 13){
      var val = input.val().trim().toLowerCase();
      if(val.length > 0) this.addStream(val);
    }
  },

  addStream: function(streamName){
    var self = this;
    StreamCtrl.get(streamName, function(err, stream){
      if(err) { 
        alert(err);
        return;
      }
      var streamModel = new Stream(stream);
      if(!self.Streams.length){
        streamModel.set('active', true);
        self.collection.add(streamModel);
        self.collection.trigger('activeStreamChange');
      }else{
        self.collection.add(streamModel);
      }
      streamModel.save();
      $('.add-stream input').val('');
    })
  },

  streamClick: function(e){
    var id = $(e.target).text(),
        newActive = this.Streams.findWhere({id: id}),
        oldActive = this.Streams.findWhere({active: true});
      
    if(oldActive.id === newActive.id) return;
    oldActive.set('active', false)
    newActive.set('active', true);

    this.Streams.trigger('activeStreamChange');
  }

});

module.exports = SidebarView;