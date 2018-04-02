var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var crewSchema = new mongoose.Schema({
	created_by: { type: Schema.ObjectId, ref: 'User' },
	created_at: {type: Date, default: Date.now},
	name: String,
	amount: String
});

var Crew = mongoose.model('Crew', crewSchema);

function getCrews(res){
	Crew.find(function(err, crews) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(crews); // return all crews in JSON format
		});
};

module.exports = function(app) {

// api ---------------------------------------------------------------------
// get all crews
	app.get('/api/crews', function(req, res) {

		// use mongoose to get all crews in the database
		getcrews(res);
	});

//Get all crews based on User
	app.get('/api/:userId', function(req, res) {
	mongoose.model('Crew').find({user: req.params.userId}, function(err, crews) {
		mongoose.model('Crew').populate(crews, {path: 'user'}, function(err, crews) {
		res.send(crews);
		});
	});
	});

// create crew and send back all crews after creation
	app.post('/api/crews', function(req, res) {

		// create a crew, information comes from AJAX request from Angular
		Crew.create({
			name : req.body.text,
			location : req.body.text,
			done : false
		}, function(err, crew) {
			if (err)
				res.send(err);

			// get and return all the crews after you create another
			getCrews(res);
		});
	});

// delete a crew
	app.delete('/api/crews/:crew_id', function(req, res) {
		Crew.remove({
			_id : req.params.crew_id
		}, function(err, crew) {
			if (err)
				res.send(err);

			getCrews(res);
		});
	});

module.exports = mongoose.model('Crew', crewSchema);
}
