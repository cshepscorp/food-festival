const path = require("path");
const webpack = require("webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const WebpackPwaManifest = require("webpack-pwa-manifest");

// webpack will next take the entry point we have provided, bundle that code, and output that bundled code to a folder called 'dist'
const config = {
      devServer: {
        static: {
          directory: __dirname
        }
      },
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
        }),
        new WebpackPwaManifest({
          name: "Food Event",
          short_name: "Foodies",
          description: "An app that allows you to view upcoming food events.",
          start_url: "../index.html",
          background_color: "#01579b",
          theme_color: "#ffffff",
          fingerprints: false, // Fingerprints tell webpack whether or not it should generate unique fingerprints so that each time a new manifest is generated
          inject: false, // determines whether the link to the manifest.json is added to the HTML. Because we are not using fingerprints, we can also set inject to be false
          icons: [{
            src: path.resolve("assets/img/icons/icon-512x512.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons")
          }]
        })
      ],
      mode: 'development' // default mode is 'production'
};

module.exports = config;