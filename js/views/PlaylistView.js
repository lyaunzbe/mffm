JST = JST = require('../util/templates');

var PlaylistView = Backbone.View.extend({
  el: '.playlist',

  template: JST['playlist'],

  events: {
    'mouseover li' : 'overItem',
    'mouseout li'  : 'outItem',
    'click li i.fa-play' : 'selectItem'
  },

  render: function(){
    var activeTrack = ( this.Player.get('stream') === this.Playlist.get('id') )
                      ? this.Player.get('activeTrack') : null;
    var playlist = {items: this.Playlist.get('tracks'),
                    active: activeTrack,
                    status: this.Playlist.get('status')};
    console.log(playlist);
    console.log('rendering playlist', playlist);
    this.$el.empty();
    this.$el.append(this.template(playlist));
    // this.$el.scrollTop(0);
  },
  initialize: function(opts){
    this.Playlist = opts.playlist;
    this.Player = opts.player;

    this.listenTo(this.Playlist, 'change:status', this.statusChange);
    this.listenTo(this.Playlist, 'change:index', this.statusChange);
    this.listenTo(this.Playlist, 'playerLoaded', this.render);
  },

  overItem: function(e){
    var item = $(e.currentTarget);

    var icon = $('.controls i.fa-pause').length > 0 ? 'fa fa-volume-up' : 'fa fa-volume-off';

    if(item.hasClass('active'))
      item.find('i').removeClass().addClass('fa fa-play');

    item.find('i').css('visibility', 'visible');

  },

  outItem: function(e){
    var item = $(e.currentTarget);

    var icon = $('.controls i.fa-pause').length > 0 ? 'fa fa-volume-up' : 'fa fa-volume-off';

    item.find('i').css('visibility', 'hidden');

    if(item.hasClass('active'))
      item.find('i').removeClass().addClass(icon).css('visibility', 'visible');
  },

  selectItem: function(e){
    var item = $(e.currentTarget).parent('li'),
        index = item.data('index');


    this.Playlist.set('index', index);
    this.Player.set('activeTrack', index);
    this.Player.set('stream', this.Playlist.get('id'));
    this.Playlist.trigger('playlistSelection');

  },

  statusChange: function(e){
    console.log('ARGS',arguments);
    var status = e.get('status'),
        index  = e.get('index');

    this.$el.find('li').removeClass();
    this.$el.find('i').removeClass()
      .addClass('fa fa-play').css('visibility', 'hidden');

    switch (status){
      case 0:
        if(this.Player.get('stream') === null ||
        this.Player.get('stream') === this.Playlist.get('id')) {

          this.$el.find('[data-index="'+index+'"]')
            .addClass('active')
            .find('i').removeClass()
            .addClass('fa fa-volume-off').css('visibility', 'visible');
        }
        break;
      case 1:
        console.log(this.Player.get('stream'), this.Playlist.get('id'))
        if(this.Player.get('stream') === null ||
        this.Player.get('stream') === this.Playlist.get('id')) {
          this.$el.find('[data-index="'+index+'"]')
            .addClass('active')
            .find('i').removeClass()
            .addClass('fa fa-volume-up').css('visibility', 'visible');
        }
        break;
      default:

    }

  }

});

module.exports = PlaylistView;
