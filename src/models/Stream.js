var StreamCtrl = require('../controllers/StreamCtrl.js'),
    async      = require('async');

var Stream = (function(){

  _private = {

    validateStream: function(stream, cb){
      var baseurl = 'http://www.reddit.com/subreddits/search.json';
      $.getJSON(baseurl+'?q='+stream+'&jsonp=?', function(data){
        var data = data.data;
        if(data.children.length > 0){
          var result = data.children.shift().data.display_name;
          if(result === stream){
            cb(null, true);
          }else{
            cb(null, false);
          }
        }else{
          cb(null, false);
        }
      });
    },

    requestStream: function(stream, cb){
      var baseurl = 'http://www.reddit.com/r/';
      _private.validateStream(stream, function(err, valid){
        if(err) return cb(err);

        if(!valid){
          return cb('No such subreddit exists.')
        }

        $.getJSON(baseurl+stream+'.json?jsonp=?',function(data){
          var data = data.data.children;
          cb(null, data);
        });
      });
    }
  }

  return {
    add: function(stream, cb){
      // Validates the stream, send req, save to db
      // return json resp

      _private.requestStream(stream, function(err, data){
        if(err) return cb(err);
        StreamCtrl.put(stream, data, function(err){
          if(err) return cb(err);
          cb(null);
        });
      })

    }, 
    fetch: function(streams){
      // Fetches each stream, either from db, or, 
      // if it has expired, update it.
    },
    update: function(){

    }
  }
})();

module.exports = Stream;