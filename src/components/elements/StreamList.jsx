/**
 * @jsx React.DOM
 */
var React = require('react-core').React;

var Sidebar = React.createClass({

	render: function(){
		console.log(this.props.user);
		return (
			<div class="sidebar">
				<img class="logo" src="../public/img/logo.png">
				<StreamList />
				<AddStream />
			</div>
		);
	}	
});

module.exports = Sidebar;
