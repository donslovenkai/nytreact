// Mongoose is used to create an Article schema and model

// Mongoose dependency
var mongoose = require('mongoose');

// Create the Mongoose schema class
var Schema = mongoose.Schema;

// Instantiate a userSchema object with the Schema class we just made
var ArticleSchema = new Schema({

// Articles fields: title, date, and url link to article

  // Article title; a string containing the title of the stored article from NYTimes.com
  // Trim any trailing whitespace, make all data objects required
  title: {
    type: String,
    trim: true,
    required: true,
  },

  // Publish date and time of the article
  date: {
    type: String,
    required: true,
  },
  //alternate code, might try
  // type:Date,
  // default: Date.now,
  // required: true,

  // URL of the article on NYTimes.com
  url: {
    type: String,
    trim: true,
    required: true,
  }
});

// Create Create the Article model with the ArticleSchema schema
var Article = mongoose.model('Article', ArticleSchema);

// Export User model, so it can be used in server.js with a require
module.exports = Article;