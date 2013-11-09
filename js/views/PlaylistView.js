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

    var playlist = {items: this.Playlist.toJSON().tracks};
    console.log('rendering playlist', playlist);
    this.$el.empty();
    this.$el.append(this.template(playlist));

  },
  initialize: function(opts){
    console.log('init PlaylistView');
    this.Playlist = opts.playlist;

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
    this.Playlist.trigger('playlistSelection');
    
  },

  statusChange: function(e){
    var status = e.get('status'),
        index  = e.get('index');

    console.log(status, index);
    this.$el.find('li').removeClass();
    this.$el.find('i').removeClass()
      .addClass('fa fa-play').css('visibility', 'hidden');

    switch (status){
      case 0:
      this.$el.find('[data-index="'+index+'"]')
          .addClass('active')
          .find('i').removeClass()
          .addClass('fa fa-volume-off').css('visibility', 'visible');
        break;
      case 1:
        this.$el.find('[data-index="'+index+'"]')
          .addClass('active')
          .find('i').removeClass()
          .addClass('fa fa-volume-up').css('visibility', 'visible');
        break;
      default:

    }

  }

});

module.exports = PlaylistView;