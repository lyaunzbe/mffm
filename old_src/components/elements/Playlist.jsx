/**
 * @jsx React.DOM
 */
var React = require('react-core').React,
    _     = require('lodash');

var Playlist = React.createClass({
  onItemHover : function(e){
    var item = $(e.currentTarget);

    var icon = $('.controls i.pause').length > 0 ? 'icon-volume-up' : 'icon-volume-off';
    if(e.type === "mouseenter"){
      if(item.hasClass('active')) 
        item.find('i').removeClass().addClass('icon-play');

      item.find('i').css('visibility', 'visible');
    }else{
      item.find('i').css('visibility', 'hidden');
      if(item.hasClass('active')) 
        item.find('i').removeClass().addClass(icon).css('visibility', 'visible');
    }
  },
  
  onItemSelect: function(e){
    var icon = $(e.target),
        action = icon.attr('class').split('-')[1];

    icon.removeClass();

    $('.playlist').find('li.active')
      .removeClass('active')
      .find('i').removeClass()
      .addClass('icon-play').css('visibility', 'hidden');

    icon.removeClass();
    icon.addClass('icon-volume-up').css('visibility', 'visible');
    icon.parent().addClass('active');
    this.props.trackSelect(icon.parent().attr('data-index'));
  
  },
  render: function(){
    var self = this;
    var playlistRaw = this.props.active ? this.props.active.playlist : null,
        playlist    = null;

    $('.playlist').on('mouseenter mouseleave', 'li', this.onItemHover);

    if(playlistRaw){
      playlist = playlistRaw.map(function(item, i){
        return <li data-index={i}>
          <i onClick={self.onItemSelect} class="icon-play"></i>
          {_.unescape(item.title)}
        </li>;
      });
    }
    return (
      <ul class="playlist">
        {playlist}
      </ul>
    );
  } 
});

module.exports = Playlist;
