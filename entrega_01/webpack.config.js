const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry:{
        main:'./src/index.jsx',
        game:'./src/components/Game/game.js'
    },
    devtool: 'inline-source-map',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',

    },
    devServer:{
        historyApiFallback:true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },

            },

            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            // {
            //     test: /\.(png|svg|jpe?g|gif)$/,
            //     include: 'src/components/Game/img',
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]',
            //                 outputPath: 'images/',
            //                 publicPath: 'images/'
            //             }
            //         }
            //     ]
            // }


        ],

    },

    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),

    ],
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://6fra5t373m.execute-api.eu-west-1.amazonaws.com/development'
        })
    }
};