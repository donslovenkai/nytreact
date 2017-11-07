// Mongoose dependency
var mongoose = require('mongoose');

// Create the Mongoose schema class
var Schema = mongoose.Schema;

// Create the Article schema
var ArticleSchema = new Schema({

// Articles fields: title, date, and url link to article

  // Article title
  title: {
    type: String,
    required: true
  },

  // Date of Article
  date: {
    type: String,
    required: true
  },
  
  // Link to Article
  url: {
    type: String,
    required: true
  }

});

// Create the Article model using Mongoose
var Article = mongoose.model('Article', ArticleSchema);

// Export the model
module.exports = Article;