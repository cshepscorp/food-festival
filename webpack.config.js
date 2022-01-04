const path = require("path");
const webpack = require("webpack");

// webpack will next take the entry point we have provided, bundle that code, and output that bundled code to a folder called 'dist'
module.exports = {
    entry: './assets/js/script.js',
    output: { 
        path: path.resolve(__dirname, 'dist'), // standard practice is to output to a dist folder
        filename: 'main.bundle.js'
      },
      // use the providePlugin plugin to define the $ and jQuery variables to use the installed npm package. If we did not do this, the code would still not work even though we installed jQuery
      plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
      ],
      mode: 'development' // default mode is 'production'
};