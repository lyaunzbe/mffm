_ = require('underscore');
Backbone = require('../bower_components/exoskeleton');
Backbone.LocalStorage = require("backbone.localstorage");
Backbone.sync = Backbone.LocalStorage.sync;
YT = {};
var AppView = require('./views/AppView');

window.onYouTubeIframeAPIReady = function() {
  console.log(YT);
  $(document).ready(function(){
    new AppView();
  });
};