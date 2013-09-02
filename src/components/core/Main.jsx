/**
 * @jsx React.DOM
 */
var React = require('react-core').React,
    Player = require('../elements/Player.jsx'),
    Playlist = require('../elements/Playlist.jsx'); 

var Main = React.createClass({

	render: function(){
		// console.log(this.state.user);
		return (
			<div class="main">
        <Playlist />
        <Player active={this.props.active}/>
			</div>
		);
	}	
});

module.exports = Main;
