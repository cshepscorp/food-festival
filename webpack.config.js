const path = require("path");

// webpack will next take the entry point we have provided, bundle that code, and output that bundled code to a folder called 'dist'
module.exports = {
    entry: './assets/js/script.js',
    output: { 
        path: path.resolve(__dirname, 'dist'), // standard practice is to output to a dist folder
        filename: 'main.bundle.js'
      },
      mode: 'development' // default mode is 'production'
};