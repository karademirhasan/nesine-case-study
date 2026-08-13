const webpack = require("webpack");
const dotenv = require("dotenv");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const env = dotenv.config().parsed || {};

const envKeys = Object.keys(env).reduce((acc, key) => {
    acc[`process.env.${key}`] = JSON.stringify(env[key]);
    return acc;
}, {});

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";

    return {
        entry: path.resolve(__dirname, "src/index.tsx"),
        output: {
            path: path.resolve(__dirname, "dist"),

            filename: isProduction
                ? "assets/js/[name].[contenthash:8].js"
                : "assets/js/[name].js",
            publicPath: "/",

            clean: true,
        },
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx|ts|tsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        "sass-loader",
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
                    type: "asset/resource",
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "public/index.html"),
            }),
            new webpack.DefinePlugin(envKeys),
        ],
        devServer: {
            port: 3000,
            open: true,
            hot: true,
            historyApiFallback: true,
        },
        devtool: isProduction
            ? "source-map"
            : "eval-cheap-module-source-map",
    };
};