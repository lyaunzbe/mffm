var SidebarView = require('./sidebarView'),
    MainView    = require('./mainView'),
    Streams     = require('../collections/streams'),
    Playlist    = require('../models/playlist'),
    Player      = require('../models/player');


var AppView = Backbone.View.extend({
  el: '#app',

  render: function(){
    this.MainView.render();
  },

  initialize: function(){
    // Initialize.
    this.Streams = new Streams();
    this.Playlist = new Playlist();
    this.Player = new Player();
    this.Streams.fetch();
    this.SidebarView = new SidebarView({ collection: this.Streams });

    this.$el.append(this.SidebarView.render());

    this.playlistChange();
    this.MainView = new MainView({streams: this.Streams, playlist: this.Playlist, player: this.Player});
    this.$el.append(this.MainView.render());

    this.listenTo(this.Streams, 'activeStreamChange', this.playlistChange);
    this.listenTo(this.Streams, 'activeStreamChange', this.render);
    Pace.start();

  },

  playlistChange: function(){
    var activeStream = this.Streams.findWhere({active:true}),
        playlist = activeStream ?
                  { tracks: activeStream.toJSON().playlist,
                    id    : activeStream.toJSON().id } : {};

    if(this.Player.get('status') == -1){
      console.log('in here')
      this.Playlist.set(playlist);
    }
  }
});

module.exports = AppView;
