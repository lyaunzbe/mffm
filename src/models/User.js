var UserCtrl = require('../controllers/UserCtrl.js'),
		Stream   = require('../models/Stream.js');

var User = (function(cb){
	var self = this;

	self.data = {
		streams: [],
		ts: null
	};
	// See if this is an existing user.
	UserCtrl.get(function(err, user){
		// If not, create and store a new user
		if(err){
			console.log('Failed to fetch existing user, creating a new one.');
			UserCtrl.put(self.data, function(err){
				if(err) cb(err);
			});	
		}else{
			console.log('Succesfully fetched existing user');
			self.data = user;
			cb(null);
		}
	});
	
});

User.prototype.addStream = function(stream, cb){
	// Check if this stream already exists
	var self = this;
	Stream.add(stream, function(err){
			if(err) return cb(err);
			self.data.streams.push(stream);
			UserCtrl.put(self.data, function(err){
				if(err) return cb(err);
				cb(null);
			});
	});

};

User.prototype.toJSON = function(){
	return this.data;
};

User.prototype.fetchStreams = function(cb){
	Stream.fetch(this.data.streams, function(err, results){
		if(err) return cb(err);
		cb(null, results);
	});

};

User.prototype.fetchStream = function(stream, cb){
	Stream.fetch(stream, function(err, result){
		if(err) return cb(err);
		cb(null, result);
	});

}

module.exports = User;