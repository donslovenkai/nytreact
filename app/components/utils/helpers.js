// Axios dependency
var axios = require('axios');

// NY Times API request function
var articleQuery = function(topic, beginYear, endYear){

// Authentication key from the NY Times API
 // var authKey = "ad790ca987ad4702a0d0621f5248be40";
// Try Dan's key:
  var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" +
                  topic + "&begin_date=" + beginYear + "0101" + "&end_date=" + endYear + "1231";


  // Create a JavaScript Promise
  return new Promise(function (fulfill, reject){
    // NY Times API get request
    axios.get(queryURL).then(function(response) {

      var result = [];

      // If the get request finds a result, return only the first 5 articles
      if (response.data.response.docs[0]) {

        for(var i=0; i<response.data.response.docs.length; i++){
          // Break out of the loop if there are more than 5 entries
          if(i==5){
            break;
          }
          else {
            // Otherwise, push to results array
            result.push(response.data.response.docs[i]);
          }
        }
        // Return the array of articles via the JS Promise
        fulfill(result);
        
      }
      else{
        // If no results, return an empty string via Promise
        reject("");
      }
      
    });
  });

}

// API Post request function
var apiSave = function(articleObj){

  // Get API Post URL
  var apiURL = window.location.origin + '/api/saved';

  // Create a JavaScript Promise
  return new Promise(function (fulfill, reject){

    // Reformat the Article object to match the Mongo Model
    var params = new URLSearchParams();
    params.append("title", articleObj.title);
    params.append("date", articleObj.date);
    params.append("url", articleObj.url);
    axios.post(apiURL, params).then(function(response){

      // Error handler; fullfil promise if successful query
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }
      
    })

  });
  
}

// API Post request function
var apiGet = function(){

  // Get API Post URL
  var apiURL = window.location.origin + '/api/saved';

  // Create a JavaScript Promise
  return new Promise(function (fulfill, reject){

    // Reformat the Article object to match the Mongo Model
    axios.get(apiURL).then(function(response) {

      // Error handler; fullfil promise if successful query
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }

    });
    
  });
  
}

// API Post request function
var apiDelete = function(deleteArticleId){

  // Get API Post URL for deleting articles
  var apiURL = window.location.origin + '/api/delete/' + deleteArticleId;

  // Create a JavaScript Promise
  return new Promise(function (fulfill, reject){

    // Send the MongoDB Id for deletion
    axios.post(apiURL).then(function(response) {

      // Error handler; fullfil promise if successful query
      if(response){
        fulfill(response);
      }
      else{
        reject("");
      }

    });

  });

}

// Export all helper functions
module.exports = {
 articleQuery,
 apiSave,
 apiGet,
 apiDelete
}