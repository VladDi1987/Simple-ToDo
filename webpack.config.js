const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MediaQueryPlugin = require('media-query-plugin');

let config = {
    // enter in project
    entry: path.resolve(__dirname, './assets/index.js'),
    output: {
        filename: 'js/index.js',
        // out of project
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{loader: 'html-loader', options: {minimize: false}}],
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: './img/[name].[ext]',
                            limit: 100,
                        },
                    },
                    {
                        loader: 'img-loader',
                    },
                ],
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: './fonts/[name].[ext]',
                    publicPath: '../',
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(sass|scss)$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    MediaQueryPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, config: {path: 'assets/js/postcss.config.js'}}
                    },
                    {
                        loader: 'sass-loader',
                        options: {sourceMap: true}
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {sourceMap: true}
                    },
                    {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, config: {path: 'assets/js/postcss.config.js'}}
                    }
                ]
            },

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            // Get html file
            template: 'assets/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
    ]
};

module.exports = config;

