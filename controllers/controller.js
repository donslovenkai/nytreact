// Node Dependencies
var express = require('express');
var router = express.Router();

// Import the Article model
var Article = require('../models/Article.js');

// Main GET route to display the ReactJS application
router.get("/", function(req, res) {
  res.sendFile(process.cwd() + "/public/index.html");
});

// API GET route to enable components to query MongoDB for all saved articles
router.get("/api/saved", function(req, res) {
  
  // Query Mongo DB for Articles
   Article.find({}, function(err, docs){
      // Log any errors
      if (err){
        console.log(err);
      } 
      // If no errors, send the doc to the browser as a json object
      else {
        res.json(docs);
      }
   });

});

// API POST route to save an article to the database
router.post("/api/saved", function(req, res) {
  
  // Create a new entry using the Article model
  var entry = new Article (req.body);

  // Save the entry to MongoDB
  entry.save(function(err, doc) {
    // log any errors
    if (err) {
      console.log(err);
      res.sendStatus(400);
    } 
    // If no errors, log the doc that was saved to the database
    else {
      console.log(doc);
      res.sendStatus(200);
    }
  });

});

// API DELETE route to delete a saved article in the database
router.post("/api/delete/:articleMongoId", function(req, res) {
  console.log(req.params.articleMongoId)
  Article.findByIdAndRemove(req.params.articleMongoId, function (err, todo) {
    if (err) {
      // Send failure notice
      console.log(err);      
      res.sendStatus(400);
    } 
    else {
      // or send success notice
      res.sendStatus(200);
    }
  });

});

// Redirect to  "/" route for any unknown cases; 
// Loads a single HTML page in (with ReactJS) in public/index.html. 
router.get("*", function(req, res) {
  res.redirect("/");
});

// Export router to server.js
module.exports = router;