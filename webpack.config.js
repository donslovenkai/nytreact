module.exports = {

  // Entry point of the react applicaton
  entry: "./app/app.jsx",

  // The compiled Javascript is output to this file
  output: {
    filename: "public/bundle.js"
  },

  // Transformations we will perform
  module: {
    loaders: [
      {
        // Only using files that in in a .js or .jsx extension
        test: /\.jsx?$/,
        // Webpack will only process files in our app folder. This avoids processing
        // node modules and server files unnecessarily
        include: /app/,
        loader: "babel",
        query: {
          // Specific transformations:
          presets: ["react", "es2015"]
        }
      }
    ]
  },
  // For debugging react code in chrome dev tools. Errors will have lines and file names.
  // (Without this the console says all errors are coming from just coming from bundle.js)
  devtool: "eval-source-map"
};