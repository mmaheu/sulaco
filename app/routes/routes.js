var express = require('express');
var router = express.Router();

// about page route (http://localhost:3000/about)
router.get('/about', function(req, res) {
    res.send('The about page!');
});

router.get('/hello/:name', function(req, res) {
    res.send('hello ' + req.params.name + '!');
});


module.exports = function(app) {

	app.use('/', router);

	// application -------------------------------------------------------------
	app.get('/pools', function(req, res) {
		res.sendfile('./public/views/float.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	app.get('/floats', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
  	app.get('/todos', function(req, res) {
    	res.sendfile('./public/views/todo.html'); // load the single view file (angular will handle the page changes on the front-end)
  });
};
