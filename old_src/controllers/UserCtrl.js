
var UserCtrl = (function(){
	return {
		get : function(cb){
	
			db.get('user', function(err, value){
				if(err) return cb(err, null);
				cb(null, JSON.parse(value));
			});

		},

		put : function(data, cb){
			var data = JSON.stringify(data);

			db.put('user', data, cb);

		}
	}

}());

module.exports = UserCtrl;