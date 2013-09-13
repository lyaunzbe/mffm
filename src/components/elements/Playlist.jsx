/**
 * @jsx React.DOM
 */
var React = require('react-core').React,
    _     = require('lodash');

var Playlist = React.createClass({

  render: function(){
    var playlistRaw = this.props.active ? this.props.active.playlist : null;
        playlist    = null;
    if(playlistRaw){
      playlist = playlistRaw.map(function(item){
        return <li>{_.unescape(item.title)}</li>;
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
