const path                        = require('path');
const HtmlWebPackPlugin           = require('html-webpack-plugin');
const MiniCssExtractPlugin        = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin   = require('css-minimizer-webpack-plugin');
const CopyPlugin                  = require('copy-webpack-plugin');
const TerserPlugin                = require('terser-webpack-plugin');  
const { CleanWebpackPlugin }      = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[contenthash].js',
    },
    optimization: {
        minimizer: [
          new CssMinimizerWebpackPlugin(),
        ]
      },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              },
            {
                test: /\.css$/i,
                exclude: /styles\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            },
            {
                test: /styles\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false,
                },
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
            inject: 'body'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
              { from: 'src/assets', to: 'assets/' },
            ],
          }),
        new TerserPlugin(),
        ]
}
