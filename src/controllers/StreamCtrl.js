
var StreamCtrl = (function(){
  return {
    get : function(cb){
      db.get('user', function(err, value){
        if(err) return cb(err, null);
        cb(null, JSON.parse(value));
      });
    },

    put : function(stream,data, cb){
      var data = JSON.stringify(data);
      
      db.put(stream, data, cb);
    }
  }

}());

module.exports = StreamCtrl;