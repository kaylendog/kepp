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
		publicPath: '/',
		port: 3000,
		historyApiFallback: true
	},

	plugins: [
		new ErrorOverlayPlugin(),
		new BundleAnalyzerPlugin({ openAnalyzer: false })
	]
});
