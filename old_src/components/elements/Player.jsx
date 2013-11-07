/**
 * @jsx React.DOM
 */
var React = require('react-core').React
    _     = require('lodash');

var Player = React.createClass({
  getInitialState: function(){
    return {ytPlayerReady:false, 
            ytPlayer:null, 
            playlist: null, 
            index: 0,
            status: false, 
            ytStatus: false };
  },

  componentDidUpdate: function(prev){
    // YT LOGIC
    // Load the yt player if it isn't already loaded
    if(this.props.active && !this.state.ytPlayerReady){
      this.loadYTPlayer();
    }else if(this.props.active){
      // Check the case where we are are a new user
      if(!this.state.playlist){
        this.setState({playlist:this.props.active.playlist});
        this.loadYTPlaylist();
      }else{
        // Is the current active playlist the same as the prev.
        if(JSON.stringify(prev.active.playlist) 
          === JSON.stringify(this.props.active.playlist)){
          // Has the current track changed?
          if(this.props.currentIndex !== null){
            if (prev.currentIndex !== this.props.currentIndex){
              this.loadTrack(this.props.currentIndex);
              return;
            }else{
              if(this.props.status && (this.props.status !== prev.status)){
                this.state.ytPlayer.loadVideoById(this.state.playlist[this.props.currentIndex].id);
                this.setState({status:true});
              }
              return;
            }
          }

        // Apparently not, let's load the new active playlist.
        }else{

        }
      }
    }

  },


  onYTPlayerReady: function(e){
    this.setState({ytPlayerReady:true});

  },
  
  onYTPlayerStateChange: function(e){
    var self = this;
    var trackProgress = function(){
      var player = self.state.ytPlayer;

      var progress = (player.getCurrentTime() / player.getDuration()) * 100;
      var width = $('.track-progress .slider').css('width', progress+'%');
    }

    switch(e.data){
      case 1:
        console.log('ya');
        setInterval(trackProgress,200);
        break;
      case 2:
        clearInterval(trackProgress);
        break;
    }
  },

  loadYTPlaylist: function(){
    //reset the ytIndex
    this.setState({ytIndex:0});
    var player = this.state.ytPlayer;
    player.cueVideoById(this.state.playlist[this.state.index].id);

  },

  loadTrack: function(index){
    this.setState({index: index, status:true});
    this.state.ytPlayer.loadVideoById(this.state.playlist[index].id);
    $('.controls i.icon-play').removeClass().addClass('pause icon-pause');
  },

  loadYTPlayer: function(){
    var self = this;
    $(document).ready(function(){
      self.state.ytPlayer = new YT.Player('stereo', {
        events: {
          'onReady': self.onYTPlayerReady,
          'onStateChange': self.onYTPlayerStateChange,
        }    
      });
    });
  },

  onPlay: function(){
    this.props.status = null;
    console.log('play');
    this.state.ytPlayer.playVideo();
    this.setState({status: true});
    $('.playlist li').removeClass();
    $($('.playlist li')[this.state.index])
      .addClass('active')
      .find('i').removeClass()
      .addClass('icon-volume-up').css('visibility', 'visible');
    var pp = this.refs.pp.getDOMNode();
    $(pp).removeClass();
    $(pp).addClass('pause icon-pause');
  },

  onPause: function(){
    this.props.status = null;
    console.log('pause');
    this.state.ytPlayer.pauseVideo();
    this.setState({status: false});
    $($('.playlist li')[this.state.index])
      .addClass('active')
      .find('i').removeClass()
      .addClass('icon-volume-off').css('visibility', 'visible');
    var pp = this.refs.pp.getDOMNode();
    $(pp).removeClass();
    $(pp).addClass('play icon-play');
    console.log($(pp));
  },

  onForward: function(){
    this.props.status = null;
    var length = this.state.playlist.length;
    var nextIndex = this.state.index+1;
    if(nextIndex < length){
      console.log(nextIndex);
      this.setState({index: nextIndex});

      $('.playlist li').removeClass()
        .find('i').removeClass().addClass('icon-play')
        .css('visibility', 'hidden');

      $($('.playlist li')[nextIndex])
        .addClass('active')
        .find('i').removeClass()
        .addClass('icon-volume-up').css('visibility', 'visible');

      if($('.controls').find('i.play').length > 0)
        $('.controls').find('i.play').removeClass().addClass('pause icon-pause');

      console.log(this.state.index);
      this.state.ytPlayer.loadVideoById(this.state.playlist[nextIndex].id);
    }
  },

  onBackward: function(){
    this.props.status = null;
    var nextIndex = this.state.index-1;
    console.log(nextIndex);

    if(nextIndex >= 0){
      console.log(nextIndex);
      this.setState({index: nextIndex});

      $('.playlist li').removeClass()
        .find('i').removeClass().addClass('icon-play')
        .css('visibility', 'hidden');

      $($('.playlist li')[nextIndex])
        .addClass('active')
        .find('i').removeClass()
        .addClass('icon-volume-up').css('visibility', 'visible');
      console.log(this.state.index);
      this.state.ytPlayer.loadVideoById(this.state.playlist[nextIndex].id);
    }
      
  },
  render: function(){
    var pp = this.state.status ? 'onPause' : 'onPlay';
    var ppclass = this.state.status ? 'pause' : 'play';

    var c_string = ppclass+ " icon-"+ppclass;

    return (
      <div class="player">
        <div class="controls">
          <i onClick={this.onBackward} class="back icon-fast-backward" />
          <i ref="pp" onClick={this[pp]} class={c_string}/>
          <i onClick={this.onForward}class="forward icon-fast-forward" />
        </div>
        <div class="progress">
          <div class="track-progress">
            <div class="slider"></div>
          </div>
        </div>
        <div id="stereo"></div>
      </div>
    );
  } 
});

module.exports = Player;
