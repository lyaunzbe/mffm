/**
 * @jsx React.DOM
 */
var React = require('react-core').React
    _     = require('lodash');

var Player = React.createClass({
  getInitialState: function(){
    return {ytPlayerReady:false, 
            ytPlayer:null, 
            ytPlaylist: null, 
            ytIndex: 0, 
            ytStatus: false };
  },

  componentDidUpdate: function(prev){
    // YT LOGIC
    // Load the yt player if it isn't already loaded
    if(this.props.active && !this.state.ytPlayerReady){
      this.loadYTPlayer();
    }else{
      console.log(this.props.active);
      // Check the case where we are are a new user
      if(this.props.active){
        if(!this.state.ytPlaylist){
          this.setState({ytPlaylist:this.props.active.playlist});
          this.loadYTPlaylist();
        }else{
          if(JSON.stringify(prev.active) 
            === JSON.stringify(this.props.active)){

          }else{

          }
        }
      }
    }

  },

  onYTPlayerReady: function(e){
    this.setState({ytPlayerReady:true});
  },
  
  onYTPlayerStateChange: function(e){
  },

  loadYTPlaylist: function(){
    //reset the ytIndex
    this.setState({ytIndex:0});
    var player = this.state.ytPlayer;
    // _.each(this.state.ytPlaylist, function(item){
    //   console.log(item);
    //   player.cueVideoById(item);
    // });
    player.cueVideoById(this.state.ytPlaylist[this.state.ytIndex].id);

  },

  loadYTPlayer: function(){
    var self = this;
    $(document).ready(function(){
      self.state.ytPlayer = new YT.Player('stereo', {
        events: {
          'onReady': self.onYTPlayerReady,
          'onStateChange': self.onYTPlayerStateChange
        }    
      });
    });
  },

  onPlay: function(){
    console.log('play');
    this.state.ytPlayer.playVideo();
    this.setState({ytStatus: true});
    var pp = this.refs.pp.getDOMNode();
    $(pp).removeClass();
    $(pp).addClass('pause icon-pause');
  },

  onPause: function(){
    console.log('pause');
    this.state.ytPlayer.pauseVideo();
    this.setState({ytStatus: false});
    var pp = this.refs.pp.getDOMNode();
    $(pp).removeClass();
    $(pp).addClass('play icon-play');
    console.log($(pp));
  },

  onForward: function(){
    var length = this.state.ytPlaylist.length;
    var nextIndex = this.state.ytIndex+1;
    if(nextIndex < length){
      console.log(nextIndex);
      this.setState({ytIndex: nextIndex});
      console.log(this.state.ytIndex);
      this.state.ytPlayer.loadVideoById(this.state.ytPlaylist[nextIndex].id);
    }
  },

  onBackward: function(){
    var nextIndex = this.state.ytIndex-1;
    console.log(nextIndex);

    if(nextIndex >= 0){
      console.log(nextIndex);
      this.setState({ytIndex: nextIndex});
      console.log(this.state.ytIndex);
      this.state.ytPlayer.loadVideoById(this.state.ytPlaylist[nextIndex].id);
    }
      
  },
  render: function(){
    var pp = this.state.ytStatus ? 'onPause' : 'onPlay';
    var ppclass = this.state.ytStatus ? 'pause' : 'play';
    return (
      <div class="player">
        <div class="controls">
          <i onClick={this.onBackward} class="back icon-fast-backward" />
          <i ref="pp" onClick={this[pp]} class="play icon-play" />
          <i onClick={this.onForward}class="forward icon-fast-forward" />
        </div>
        <div id="stereo"></div>
      </div>
    );
  } 
});

module.exports = Player;
