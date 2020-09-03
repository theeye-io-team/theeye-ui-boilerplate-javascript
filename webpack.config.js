const path = require('path')
const webpack = require('webpack')
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const config = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js'
    //filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': process.env.NODE_ENV
    }),
    new HtmlWebpackPlugin({
      title: 'main',
      template: path.join(__dirname, '/src/template.html')
    })
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
  },
	module: {
		rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
			{
				test: /\.m?js$/,
				//exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
      {
        test: /(\.css|\.less)$/,
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader' // compiles Less to CSS
        }]
      },
      {
        test: /\.(scss)$/,
        use: [{
          loader: 'style-loader', // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      //{
      //  test: /\.css$/,
      //  use: ['style-loader', 'css-loader'],
      //},
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
		]
	}
}

if (process.env.NODE_ENV === 'development') {
  Object.assign(config, {
    mode: 'development',
    devtool: 'source-map'
  })
} else {
  if (process.env.DISABLE_MINIMIZER !== "true") {
    Object.assign(config, {
      mode: 'production',
      optimization: {
        minimizer: [
          new UglifyJsWebpackPlugin({
            uglifyOptions: {
              output: {
                comments: false
              }
            }
          })
        ]
      }
    })
  }

  config.plugins.push(new CleanWebpackPlugin(['dist']))
}

module.exports = config
