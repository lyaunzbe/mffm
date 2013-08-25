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
    Main  = require('./Main.jsx'),
    leveljs = require('level-js'),
    levelup = require('levelup'),
    factory = function(location){ return new leveljs(location) };

    window.db = levelup('mffm', {db: factory, valueEncoding: 'json'});

var Application = React.createClass({
  getInitialState: function(){
    return { user : new User() };
  },

  addStream: function(stream){
    updatedUser = this.state.user.addStream(stream);
    this.setState({ user : updatedUser });
    console.log(this.state);
  },

  render: function() {

    return (
      <div id="mainContainer">
        <Sidebar onAddStream={this.addStream} user={this.state.user} />
        <Main />
      </div>
    );
  }
});
module.exports = Application;