// Node dependencies
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require('morgan'); // for debugging



// Initialize Express for debugging & body parsing
var app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serve Static Content
app.use(express.static(process.cwd() + '/public'));

// Database Configuration with Mongoose
// Heroku not ready yet, commenting out...
// Connect to localhost if not a production environment
//if(process.env.NODE_ENV == 'production'){
  // Gotten using `heroku config | grep MONGODB_URI` command in Command Line
//mongoose.connect('mongodb://heroku_zw8mscf2:b3shum9s2co70p2belhnr7fahs@ds249565.mlab.com:49565/heroku_zw8mscf2');
//}
//else{
//mongoose.connect('mongodb://localhost/nytreact');
//}
//mongoose.connect('mongodb://localhost/nytreact');

mongoose.connect('mongodb://heroku_zw8mscf2:b3shum9s2co70p2belhnr7fahs@ds249565.mlab.com:49565/heroku_zw8mscf2');

var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// Import the Article model
var Article = require('./models/Article.js');
// ------------------------------------------------------------------

// Import the routes controller
var router = require('./controllers/controller.js');
app.use('/', router);


// Launch app
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Running on port: ' + port);
});