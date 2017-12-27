const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        main: './app/index.js',
    },
    // entry: {
    // app: [
    //     'babel-polyfill',
    //     path.resolve(__dirname, 'app/index.js')
    // ],
    // vendor: ['pixi', 'p2', 'phaser', 'webfontloader']
    // },
    output: {
        filename: 'game.js',
        path: path.join(__dirname, 'build', 'dev'),
        publicPath: '/'
    },
    devServer: {
        inline: true,
        historyApiFallback: true
    },
    module: {
        loaders: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                // use: [
                //     {loader: 'babel-loader'}
                // ]
            },
            // {
            //     test: /\.(css|less)$/,
            //     use: [
            //         {loader: 'style-loader'},
            //         {loader: 'css-loader'},
            //         {loader: 'less-loader'}
            //
            //     ]
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            inject: true
        })
    ],
    resolve: {
        modules:['node_modules'],
        extensions: ['.js'],
    }
};
