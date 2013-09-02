
var StreamCtrl = (function(){
  return {
    get : function(stream,cb){
      db.get(stream, function(err, value){
        if(err) return cb(err, null);
        data = JSON.parse(value);
        cb(null, data);
      });
    },

    put : function(stream, data, cb){
      var data = JSON.stringify(data);
      
      db.put(stream, data, cb);
    }
  }

}());

module.exports = StreamCtrl;