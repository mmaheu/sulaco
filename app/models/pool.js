var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var poolSchema = new mongoose.Schema({
  created_by: { type: Schema.ObjectId, ref: 'User' },
  created_at: {type: Date, default: Date.now},
  name: String,
  amount: String,
  token: String,
  crewsize: String
});

var Pool = mongoose.model('Pool', poolSchema);

function getPools(res){
  Pool.find(function(err, pools) {

      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
      if (err)
        res.send(err)

      res.json(pools); // return all pools in JSON format
    });
};

function findByToken(token, callback){

	Pool.findOne({ pool_token: token}, function(err, pool){

		if(err){
			return callback(err);
		}

		//success
		return callback(null, pool);
	});

}


module.exports = function(app) {

// api ---------------------------------------------------------------------
// get all pools
  app.get('/api/pools', function(req, res) {

    // use mongoose to get all pools in the database
    getPools(res);
  });
  
// get all pools
  app.get('/api/pool/:token', function(req, res) {

    // use mongoose to get all pools in the database
    findByToken(res);
  });
  

//Get all pools based on User
  app.get('/api/:userId', function(req, res) {
  mongoose.model('Pool').find({user: req.params.userId}, function(err, pools) {
    mongoose.model('Pool').populate(pools, {path: 'user'}, function(err, pools) {
    res.send(pools);
    });
  });
  });

  app.get('/api/pools/:pool_Id', function(req, res) {
  mongoose.model('Pool').find({pool: req.params.poolId}, function(err, pools) {
    mongoose.model('Pool').populate(pools, {path: 'pool'}, function(err, pools) {
    res.send(pools);
    });
  });
  });

// create pool and send back all pools after creation
  app.post('/api/pools', function(req, res, next) {

// create a pool, information comes from AJAX request from Angular
    Pool.create({
      name : req.body.text,
      amount : req.body.amount,
      crewsize : req.body.crewsize,
      done : false
    }, function(err, pool) {
     
      if (err)
        res.send(err);

      //Add the token URL to the Object
      var token = pool.id.substring(19,24);
      var tokenurl = 'http://localhost:3000/' + token
      pool.token = tokenurl;
      
      //Update the Pool with the generated token(url)
      pool.save(function(err) {
      if (err) throw err;

        console.log('Pool successfully updated!');
      });
     var pools = ['pool', pool];   
     // Return PoolURL in the Response);     
     res.send(pools);
    });
  });

// delete a pool
  app.delete('/api/pools/:pool_id', function(req, res) {
    Pool.remove({
      _id : req.params.pool_id
    }, function(err, pool) {
      if (err)
        res.send(err);

      getPools(res);
    });
  });

module.exports = mongoose.model('Pool', poolSchema);
}
