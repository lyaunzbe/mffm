/**
 * @jsx React.DOM
 */
var React = require('react-core').React,
		AddStream = require('../elements/AddStream.jsx'),
		StreamList = require('../elements/StreamList.jsx');

var Sidebar = React.createClass({

	handleAddStream: function(stream){
		this.props.onAddStream(stream);
	},

	render: function(){
		return (
			<div class="sidebar">
				<div class="logo">MFFM
				<object class="ico" type="image/svg+xml" data="./img/note.svg" width="33" height="33"/>
				</div>
				<StreamList streams={this.props.user.streams} active={this.props.active} />
				<footer>
					<AddStream onAddStream={this.handleAddStream} />
				</footer>
			</div>
		);
	}	
});

module.exports = Sidebar;
