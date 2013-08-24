/**
 * @jsx React.DOM
 */
var React = require('React'),
		AddStream = require('../elements/AddStream');

var Sidebar = React.createClass({

	handleAddStream: function(stream){
		this.props.onAddStream(stream);
	},

	render: function(){
		return (
			<div class="sidebar">
				<footer>
					<AddStream onAddStream={this.handleAddStream} />
				</footer>
			</div>
		);
	}	
});

module.exports = Sidebar;
