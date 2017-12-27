const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const phaserModule = path.join(__dirname, '/node_modules/phaser/')
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
const pixi = path.join(phaserModule, 'build/custom/pixi.js')
const p2 = path.join(phaserModule, 'build/custom/p2.js')


var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});


module.exports = {
    devtool: 'source-map',
    entry: {
        main: './app/index.js',
        vendor:['pixi', 'p2', 'phaser']
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
        alias: {
            'phaser': phaser,
            'pixi': pixi,
            'p2': p2
        }
    }
};
