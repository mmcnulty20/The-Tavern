const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const outputDir = "./dist";
const HtmlWebpackPlugin =  require("html-webpack-plugin")

module.exports = {
entry: path.resolve(__dirname, "src", "index.js"), //
output: {
    path: path.join(__dirname, outputDir),
    filename: "main.js",
    publicPath: "/"
},
resolve: {
    extensions: [".js"] // if we were using React.js, we would include ".jsx"
},
module: {
    rules: [
    {
        test: /\.js$/, // if we were using React.js, we would use \.jsx?$/
        use: {
        loader: "babel-loader",
        options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-optional-chaining"],
            exclude: /node_modules/
        } // if we were using React.js, we would include "react"
        }
    },
    {
        test: /\.css$/,
        use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            publicPath: "../",
            hmr: process.env.NODE_ENV === "development"
            }
        },
        "css-loader",
        "postcss-loader"
        ]
    },
    {
        test: /\.(png|jpe?g|gif|ico)$/i,
        use: [
        {
            loader: "file-loader",
            options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            name: "[name].[ext]",
            outputPath: "pixel_assets",
            publicPath: "pixel_assets"
            }
        }
        ]
    },
    {
        test: /\.scss/,
        use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
            // you can specify a publicPath here
            // by default it uses publicPath in webpackOptions.output
            publicPath: "../",
            hmr: process.env.NODE_ENV === "development"
            }
        },
        "css-loader",
        "sass-loader",
        "postcss-loader"
        ]
    }
    ]
},
plugins: [
    new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // all options are optional
    filename: "main.css",
    chunkFilename: "[id].css",
    ignoreOrder: false // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({
        title: 'The Tavern',
        template: "dist/base.html",
        favicon: "resources/mug.ico"
      }),
    require("autoprefixer")
]
};