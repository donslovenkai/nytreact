// React dependencies
var React = require("react");
var ReactDOM = require("react-dom");

// Include the Main parent Component
var Main = require("./components/children/Main.jsx");

// Render the Main component 
// The Id "app" corresponds to the div id app in index.html
ReactDOM.render(<Main />, document.getElementById("app"));
