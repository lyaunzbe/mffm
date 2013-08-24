var UserCtrl = require('../controllers/UserCtrl.js');

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

User.prototype.addStream = function(stream){
	this.data.streams.push(stream);
	return this;
}

module.exports = User;