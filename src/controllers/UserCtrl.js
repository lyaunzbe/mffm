
var UserCtrl = (function(){
	return {
		get : function(cb){
			db.open(function(err){
				if(err) cb(null, err);
				db.get('user', function(err, value){
					if(err) return cb(err, null);
					cb(null, JSON.parse(value));
				});
			});
		},

		put : function(data, cb){
			var data = JSON.stringify(data);
			db.open(function(err){
				if(err) return cb(err);
				db.put('user', data, cb);
			});
		}
	}

}());

module.exports = UserCtrl;