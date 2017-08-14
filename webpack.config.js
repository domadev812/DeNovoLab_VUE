  var path = require('path')
  var webpack = require('webpack')

  module.exports = {
        entry: {
            build: './main.js',
        },  

      module: {
          rules: [{
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/,
              query: {
                  presets: ['es2015']
              }
          }, {
              test: /\.sass/,
              use: ["style-loader", "css-loader", "sass-loader"]
              //loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
          }, {
              test: /\.scss/,
              use: ["style-loader", "css-loader", "sass-loader"]
          }, {
              test: /\.css/,
              use: ["style-loader", "css-loader", "sass-loader"]
          }, {
              test: /\.(png|jpg|woff|woff2)$/,

            use: [{
                loader: "url-loader",
                options: {
                    limit: 8192
                }
                }
            ]      
          }],
      },
      watch: true,
      vue: {
          loaders: {
              js: 'babel'
          }
      },
      resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        },
      },

       devtool: '#eval-source-map',
    // devtool : 'inline-sourcemap',


    //   output: {
    //     filename: './dist/[name].bundle.js'
    //   },
        output: {
            filename:'[name].js',
            chunkFilename: "[name].js"
        },

      plugins: [
        //   new webpack.optimize.DedupePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),        
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),        
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),

        // new webpack.optimize.AggressiveSplittingPlugin({
		// 	minSize: 1000000,
		// 	maxSize: 2000000
        // }),

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            minimize: true,
            compress: {
                drop_debugger: true,
                warnings: true,
                drop_console: true
            }
        })
      ]
  }