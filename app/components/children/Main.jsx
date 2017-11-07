// This file contains the main-container Div for the main layout and navigation,
// and sub-components for Search and Saved

// React dependency
var React = require("react");

// Include subcomponents 
var Query = require("./Query.jsx");
var Search = require("./Search.jsx");
var Saved = require("./Saved.jsx");

// Require helper.js for making the API calls
var helpers = require("../utils/helpers.js");

// Create the Main component
var Main = React.createClass({

  // Set the initial state
  getInitialState: function() {
    return {
      apiResults: [],
      mongoResults: [],
      searchTerms: ["","",""]
    };
  },

  // Functions to allow children to update the parent
  _setSearchFeilds: function(topic, start, end) {
    this.setState({ searchTerms: [topic, start, end] });
  },

  // Allow child level to update Mongo data array
  _resetMongoResults: function(newData){
    this.setState({ mongoResults: newData} );
  },

  // After the Main renders, collect the saved articles from the API endpoint
  componentDidMount: function() {

    // Access the Mongo API to get saved articles
    helpers.apiGet().then(function(query){
      this.setState({mongoResults: query.data});
    }.bind(this));

    // console.log('API Results')
    // console.log(this.state.apiResults)
    // console.log('Mongo Results')
    // console.log(this.state.mongoResults)
  },

  // When a search is entered and the component changes:
  componentDidUpdate: function(prevProps, prevState) {

    // Only hit the API once when the previous state does not equal the current state
    if(this.state.searchTerms != prevState.searchTerms){
      // Run the query for the address
      helpers.articleQuery(this.state.searchTerms[0], this.state.searchTerms[1], this.state.searchTerms[2]).then(function(data) {
        //console.log(data);
        this.setState({ apiResults: data });
      }.bind(this));
    }
  },

  // Render the function results
  render: function() {
    return (

      <div className="container" style={ {backgroundColor: "white", borderStyle: "solid", borderWidth: "1px"} }>

        <div className="page-header">
          <h1 className="text-center"><img style={ {width: "70%"} } src="img/nyt-header.svg" alt="The New York Times"/></h1>
          <h2 className="text-center" style={ {marginTop: "-12px"} }><b>React Rendition</b></h2>
          <h4 className="text-center">Search for and annotate articles of interest. Click on headlines to learn more.</h4>
        </div>

        <Query _setSearchFeilds={this._setSearchFeilds} />
        <Search apiResults={this.state.apiResults} _resetMongoResults={this._resetMongoResults} />
        <Saved mongoResults={this.state.mongoResults} _resetMongoResults={this._resetMongoResults} />

      </div>

    );
  }
});

// Export the component for use in other files
module.exports = Main;