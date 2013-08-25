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
				<StreamList streams={this.props.user.streams} />
				<footer>
					<AddStream onAddStream={this.handleAddStream} />
				</footer>
			</div>
		);
	}	
});

module.exports = Sidebar;
