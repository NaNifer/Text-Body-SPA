const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    //Entry point for files
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    //Output for all our bundles
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //Webpack plugin that generates our html file and inject our bundles
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Just Another Text Editor'
      }),
      //Inject our custom service worker
      // new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src/sw.js',
        swDest: 'service-worker.js',
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'In-browser text editor',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/assets/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          },
          {
            src: path.resolve('src/assets/large-icon.png'),
            size: '1024x1024' // you can also use the specifications pattern
          },
          {
            src: path.resolve('src/assets/maskable-icon.png'),
            size: '1024x1024',
            purpose: 'maskable'
          }
        ]
      })
    ],
    module: {
      //CSS loaders
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          //Babel loader enables ES6
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugin: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          }
        }
      ],
    },
  };
};