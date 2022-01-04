const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// webpack will next take the entry point we have provided, bundle that code, and output that bundled code to a folder called 'dist'
module.exports = {
      entry: {
        app: "./assets/js/script.js",
        events: "./assets/js/events.js",
        schedule: "./assets/js/schedule.js",
        tickets: "./assets/js/tickets.js"
      },
      output: {
        filename: "[name].bundle.js",
        path: __dirname + "/dist",  // standard practice is to output to a dist folder
      },
      module: {
        rules: [
          {
            test: /\.(jpe?g|png)$/i, // identify the type of files to pre-process using the test property to find a regular expression (regex)
            use: [
              {
                loader: "file-loader",
                options: {
                  esModule: false,
                  name (file) {
                    return "[path][name].[ext]"
                  },
                  publicPath: function(url) {
                    return url.replace("../", "/assets/")
                  }
                }  
              },
              // Make sure we keep track of the loader dependencies and ensure that file-loader processes the images first so that image-webpack-loader can optimize the emitted files.
              {
                loader: 'image-webpack-loader'
              }
            ]
          }
        ]
      },
      // use the providePlugin plugin to define the $ and jQuery variables to use the installed npm package. If we did not do this, the code would still not work even though we installed jQuery
      plugins: [
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
        }),
        new BundleAnalyzerPlugin({
          analyzerMode: "static", // "static" generates a report output to an HTML file in the dist folder
        })
      ],
      mode: 'development' // default mode is 'production'
};