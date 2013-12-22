_ = require('underscore');
Backbone = require('../bower_components/exoskeleton');
Backbone.LocalStorage = require("backbone.localstorage");
Backbone.sync = Backbone.LocalStorage.sync;

// Disable local storage for now
// window.localStorage.clear();

Pace = require('../bower_components/pace/pace.js');

YT = {};

Players = {
  yt: null
}

var AppView = require('./views/AppView');


window.onYouTubeIframeAPIReady = function() {
  $(document).ready(function(){
    new AppView();
  });
};
