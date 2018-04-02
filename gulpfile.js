// set server variables
var express  = require('express');
var app      = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port  	 = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// set gulp variables
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass')
    autoprefix = require('gulp-autoprefixer')
    notify = require("gulp-notify")
    compass = require('compass');
var config = {
    sassPath: './assets/styles',
}

// Make the fonts
gulp.task('icons', function() {
    return gulp.src('node_modules/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./public/fonts'));
});

// Compass compile the CSS from FontAwesome, Boostrap, & SASS
gulp.task('css', function() {

    return gulp.src(config.sassPath + '/app.scss')

        .pipe(sass({
            style: 'compressed',
            loadPath: [
                './assets/styles/',
                'node_modules/bootstrap-sass/assets/stylesheets',
                'node_modules/font-awesome/scss',
            ]
        })
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
         })))

        .pipe(autoprefix('last 2 version'))
        .pipe(gulp.dest('./public/css'));
        compass.compile();
});

gulp.task('serve', function() {
  // configuration ===============================================================
  mongoose.connect(database.url); 	// connect to mongoDB database on modulus.io

  app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
  app.use(morgan('dev')); // log every request to the console
  app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
  app.use(bodyParser.json()); // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


  // routes ======================================================================
  require('./app/routes/routes.js')(app);

  // listen (start app with node server.js) ======================================
  app.listen(port);
  console.log("App listening on port " + port);


});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(config.sassPath + '/*.scss', ['css']);
});

// default gulp command

gulp.task('default', ['icons', 'css' , 'serve', 'watch' ]);
