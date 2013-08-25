var UserCtrl = require('../controllers/UserCtrl.js'),
		Stream   = require('../models/Stream.js'),
		_   		 = require('lodash');

var User = (function(){
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
				if(err) console.log(err);
			});	
		}else{
			console.log('Succesfully fetched existing user');
			self.data = user;
		}
	});
	
});

User.prototype.addStream = function(stream, cb){
	// Check if this stream already exists
	this.data.streams.push(stream);
	UserCtrl.put(this.data, function(err){
		if(err) return cb(err);
		Stream.add(stream, function(err){
			if(err) return cb(err);
			cb(null);
		});
	});

}

User.prototype.toJSON = function(){
	return this.data;
}

module.exports = User;