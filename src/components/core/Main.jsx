/**
 * @jsx React.DOM
 */
var React = require('react-core').React,
    Player = require('../elements/Player.jsx'),
    Playlist = require('../elements/Playlist.jsx'); 

var Main = React.createClass({
  getInitialState: function(){
    return {
      currentIndex: null,
      status: false
    };
  },
  trackSelect: function(i){
    var i = parseInt(i);
    if(i > -1){
      this.setState({currentIndex:i, status:true});
    }else{
      this.setState({status:false});
    }
  },
	render: function(){
		return (
			<div class="main">
        <Playlist active={this.props.active} currentIndex={this.state.currentIndex} trackSelect={this.trackSelect}/>
        <Player active={this.props.active} currentIndex={this.state.currentIndex} status={this.state.status}/>
			</div>
		);
	}	
});

module.exports = Main;
