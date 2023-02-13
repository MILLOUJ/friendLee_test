const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HTMLPlugin = require("html-webpack-plugin");
module.exports = {
  entry: [
    path.resolve(__dirname, 'src', 'index.js')
  ],
  
  target: "web",
  mode: "development",

  plugins: [
    new HTMLPlugin({
      template: "src/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 2 } },
          { loader: 'sass-loader' },
          { loader: 'postcss-loader' },
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [{ loader: "babel-loader" }],
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 9000,
  },
  devtool: "source-map",
};
