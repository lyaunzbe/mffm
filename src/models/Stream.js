var StreamCtrl = require('../controllers/StreamCtrl.js'),
    _          = require('lodash'),
    async      = require('async');

var Stream = (function(){

  _private = {
    // Validate the stream by checking the subreddit name 
    // against Reddit's search API.
    validateStream: function(stream, cb){
      var baseurl = 'http://www.reddit.com/subreddits/search.json';
      $.getJSON(baseurl+'?q='+stream+'&jsonp=?', function(data){
        console.log(data);
        var data = data.data;
        if(data.children.length > 0){
          var result = data.children[0].data.display_name.toLowerCase();
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
    // Request the json stream of a valid subreddit's default front page.
    // TODO: Also fetch variations, such as hot, top, controversial, date, etc.
    // Should the variations be done on demand or by default?
    requestStream: function(stream, cb){
      var baseurl = 'http://www.reddit.com/r/';
      _private.validateStream(stream, function(err, valid){
        if(err) return cb(err);

        if(!valid){
          return cb('No such subreddit exists.')
        }

        $.getJSON(baseurl+stream+'.json?jsonp=?',function(data){
          var raw = _private.transformStreamData(data.data.children),
              playlist = _private.createPlayList(raw);
          console.log(playlist);
          var streamPack = {
            'raw' : raw,
            'playlist' : playlist
          };
          cb(null, streamPack);
        });

      });
    },

    transformStreamData: function(streamData){
      console.log(streamData);
      var filtered = _.filter(streamData, function(item){
        return (item.data.media);
      });
      console.log(filtered);
      var mapped =_.map(filtered,function(item){
        return item.data.media.oembed;
      });

      var onlyYT = _.filter(mapped, function(item){
        return (item.provider_url === "http://www.youtube.com/");
      })
      console.log(mapped);
      return onlyYT;
    },

    createPlayList: function(data){
      var playlist = _.map(data, function(item){
        console.log(item);
        var id = item.url.split('?v=')[1];
        return id;
      })
      return playlist;
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
    fetch: function(streams,cb){
      // Fetches each stream, either from db, or, 
      // if it has expired, update it.
      var results = {};
      async.each(
        streams, 
        function(item, callback){
          StreamCtrl.get(item, function(err, data){
            if(err) return callback(err);
            results[item] = data;
            callback(null);
          });
        },
        function(err){
          console.log(results);
          if(err) return cb(err);
          cb(null, results);
      });
    },

    update: function(){

    }
  }
})();

module.exports = Stream;