"use strict"

const webpack = require("webpack");

const sharedConfig = require("./webpack.shared");
const sharedPlugins = require("./sharedPlugins");
const packageJson = require("../package.json");

const envConfig = {};

if (packageJson.envConfig) {
    Object.keys(packageJson.envConfig).forEach(x => {
        envConfig[x.toUpperCase()] = JSON.stringify(packageJson.envConfig[x]);
    })
}

module.exports = Object.assign(
    sharedConfig, {
        mode: "production",
        devtool: "source-map",
        plugins: [
            ...sharedPlugins,
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify("production"),
                    ...envConfig
                }
            })
        ]
    });