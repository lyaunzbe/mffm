var SidebarView = require('./sidebarView'),
    MainView    = require('./mainView'),
    Streams     = require('../collections/streams'),
    Playlist    = require('../models/playlist');


var AppView = Backbone.View.extend({
  el: '#app',

  render: function(){

    this.MainView.render();
  },

  initialize: function(){
    this.Streams = new Streams();
    this.Playlist = new Playlist();
    this.Streams.fetch();
    this.SidebarView = new SidebarView({ collection: this.Streams});

    this.$el.append(this.SidebarView.render());

    this.playlistChange();
    this.MainView = new MainView({streams: this.Streams, playlist: this.Playlist});
    this.$el.append(this.MainView.render());
    
    this.listenTo(this.Streams, 'activeStreamChange', this.playlistChange);
    this.listenTo(this.Streams, 'activeStreamChange', this.render);
    this.render();
    Pace.start();

  },

  playlistChange: function(){
    var activeStream = this.Streams.findWhere({active:true}),
        playlist = activeStream ? 
                  { tracks: activeStream.toJSON().playlist } : {};

    this.Playlist.set(playlist);
  }
});

module.exports = AppView;