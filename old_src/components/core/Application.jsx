/**
 * Copyright 2013 Facebook, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @jsx React.DOM
 */
var React = require('react-core').React,
    Sidebar = require('./Sidebar.jsx'),
    User  = require('../../models/User.js'),
    Stream  = require('../../models/stream.js'),
    Main  = require('./Main.jsx'),
    leveljs = require('level-js'),
    levelup = require('levelup'),
    factory = function(location){ return new leveljs(location) };

window.db = levelup('mffm', {db: factory, valueEncoding: 'json'});
window.user;

var Application = React.createClass({
  getInitialState: function(){
    return { 
      user:{
        streams: []
      }, 
      streams: null,
      active: null
    };
  },
  componentDidMount: function(){
    var self = this;
    window.user = new User(function(err){
        if(err) console.log(err);
        var usr = user.toJSON();
        user.fetchStreams(function(err, streams){
          if(err){
            console.log(err);
          }else{
            var activeStream = (user.data.streams.length > 0) ? user.data.streams[0] : null,
                playlist = !$.isEmptyObject(streams) ? streams[user.data.streams[0]].playlist : [],
                active = null;

            if(activeStream){
              active = { stream: activeStream, playlist: playlist  };
            }
            self.setState({ user: usr, streams: streams, active: active });
          }
        });
    });
  },

  addStream: function(stream){
    var self = this;
    user.addStream(stream, function(err){
      if(err){
        console.log(err);
        return;
      }
      user.fetchStreams(function(err, streams){
        console.log('Success');
        console.log(streams);
        var active = (self.state.active) ? self.state.active : {
          stream: user.data.streams[0],
          playlist: streams[user.data.streams[0]].playlist
        };
        self.setState({user: user.toJSON(), streams: streams, active: active});
        console.log(self.state);
      });
    });

  },

  render: function() {
    console.log(this.state);
    return (
      <div id="mainContainer">
        <Sidebar onAddStream={this.addStream} user={this.state.user} active={this.state.active}/>
        <Main streams={this.state.streams} active={this.state.active}/>
      </div>
    );
  }
});
module.exports = Application;
