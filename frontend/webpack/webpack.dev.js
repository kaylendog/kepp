const path = require('path'),
	merge = require('webpack-merge'),
	ErrorOverlayPlugin = require('error-overlay-webpack-plugin'),
	{ BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const sharedConfig = require('./webpack.config');

module.exports = merge(sharedConfig, {
	mode: 'development',
	devtool: 'cheap-module-source-map',

	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		port: 3000
	},

	plugins: [new ErrorOverlayPlugin(), new BundleAnalyzerPlugin()]
});
