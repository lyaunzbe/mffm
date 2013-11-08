var StreamCtrl = (function(){

  _private = {
    // Validate the stream by checking the subreddit name 
    // against Reddit's search API.
    validateStream: function(stream, cb){
      var baseurl = 'http://www.reddit.com/subreddits/search.json';
      $.getJSON(baseurl+'?q='+stream+'&jsonp=?', function(data){
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
          var streamPack = {
            'id' : stream,
            'raw' : raw,
            'playlist' : playlist,
            'ts' : Date.now()
          };
          cb(null, streamPack);
        });

      });
    },

    transformStreamData: function(streamData){

      var filtered = _.filter(streamData, function(item){
        return (item.data.media);
      });

      var mapped =_.map(filtered,function(item){
        return item.data.media.oembed;
      });

      var onlyYT = _.filter(mapped, function(item){
        return (item.provider_url === "http://www.youtube.com/");
      })
      return onlyYT;
    },

    createPlayList: function(data){
      var playlist = _.map(data, function(item){
        var id = item.url.split('?v=')[1],
            title = item.title;
        return {id: id, title: title};
      })
      return playlist;
    }
  }

  return {
    get: function(stream, cb){
      // Validates the stream, send req, save to db
      // return json resp

      _private.requestStream(stream, function(err, data){
        if(err) return cb(err);
        cb(null, data);
      })
    }
  }
})();

module.exports = StreamCtrl;