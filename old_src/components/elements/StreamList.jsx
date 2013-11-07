/**
 * @jsx React.DOM
 */
var React = require('react-core').React;

var StreamList = React.createClass({

	render: function(){
		var self = this;
		var streams = this.props.streams.map(function(stream){
			if(self.props.active && stream === self.props.active.stream) return <li class="active">{stream}</li>;
			return <li>{stream}</li>;
		});
		
		return (
			<ul class="streamlist">
				{streams}
			</ul>
		);
	}	
});

module.exports = StreamList;
