/**
 * @jsx React.DOM
 */
var React = require('react-core').React;

var AddStream = React.createClass({

	add: function(stream){
		this.props.onAddStream(stream);
	},

	onKey: function(e){
		if(e.keyCode == 13){
			var stream = this.refs.stream.getDOMNode().value.trim();
			if(stream.length > 0) this.add(stream);
		}
	},

	onClick: function(){
		var stream = this.refs.stream.getDOMNode().value.trim();
		if(stream.length > 0) this.add(stream);
	},

	render: function(){
		return (
			<div class="add-stream">
				<input onKeyUp={this.onKey} type="text" ref="stream" placeholder="Add a Subreddit . . ." ></input>
				<a onClick={this.onClick} class="add"><i class="icon-plus"/></a>
			</div>
		);
	}	
});

module.exports = AddStream;
