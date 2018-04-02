var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var User = require('/models/user');

var userSchema = new mongoose.Schema({
	username: String,
	password: String, //hash created from password
	created_at: {type: Date, default: Date.now}
})

var User = mongoose.model('User', userSchema);

module.exports = function(app) {

	
//Get All users
	app.get('/api/user', function(req, res) {
	mongoose.model('User').find(function(err, user) {
		res.send(user);
	});
	});


module.exports = mongoose.model('User', userSchema);
}


