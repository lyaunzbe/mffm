/**
 * @jsx React.DOM
 */
var React = require('react-core').React;

var StreamList = React.createClass({

	render: function(){
		var streams = this.props.streams.map(function(stream){
			return <li>{stream}</li>;
		});
		
		return (
			<ul>
				{streams}
			</ul>
		);
	}	
});

module.exports = StreamList;
