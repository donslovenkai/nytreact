// Displays the Saved Articles that were searched and stored in the database

// React dependency
var React = require("react");

// Require helper.js for making API calls
var helpers = require("../utils/helpers.js");

// Create the search component
var Saved = React.createClass({

  // Set the initial state
  getInitialState: function() {
    return {
      doIneedThis: false
    };
  },

  _handleDelete: function(event) {

    // Collect the clicked article's id
    var articleMongoId = event.target.value;

    // Copy "this" into "that" so that component is accessible inside the functions.
    var that = this;

    // Send this data to the API endpoint to save it to Mongo
    helpers.apiDelete(articleMongoId).then(function(){

      // Query Mongo for new data to rerender the component to account for deletions
      helpers.apiGet().then(function(query){
        that.props._resetMongoResults(query.data);
      });

    });

  },

  // Render the Search Results panel
  render: function() {

    var that = this;

    return (

      <div className="panel panel-default">

        <div className="panel-heading">
          <h3 className="panel-title text-center" style={ {fontSize: "18px"} }><i>Saved Articles</i></h3>
        </div>

        <div className="panel-body">
          <ul className="list-group col-md-8 col-md-offset-2">

            {/* Map function to loop through an array in JSX */}
            {this.props.mongoResults.map(function(search, i) {
              return (
                <li key={search._id} className="list-group-item" style={ {borderWidth: "0px"} }>
                  <div className="input-group">
                    <div type="text" className="form-control">
                      <b><a href={search.url} target="_new" style={ {color: "black"} }>{search.title}</a></b>
                      <i> {search.date.substring(0, 10)}</i>
                    </div>
                    <span className="input-group-btn">
                      <button className="btn btn-danger" type="button" onClick={that._handleDelete} value={search._id}>Remove</button>
                    </span>
                  </div>
                </li>
              );
            })}

          </ul>
        </div>

      </div>
      
    );
  }
});


// Export the component for use in Main file
module.exports = Saved;