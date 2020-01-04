const sharedConfig = require("./webpack.config");
const path = require("path");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(sharedConfig, {
	mode: "production",

	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: "[sha1:hash:hex:4]"
						}
					},
					"less-loader"
				]
			}
		]
	},

	plugins: [new MiniCssExtractPlugin()]
});
