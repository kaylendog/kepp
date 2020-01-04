const sharedConfig = require("./webpack.config");
const path = require("path");
const merge = require("webpack-merge");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");

module.exports = merge(sharedConfig, {
	mode: "development",
	devtool: "cheap-module-source-map",

	devServer: {
		contentBase: path.join(__dirname, "../dist"),
		port: 3000
	},

	plugins: [new ErrorOverlayPlugin()]
});
