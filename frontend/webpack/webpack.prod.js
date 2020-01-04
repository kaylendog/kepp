const path = require('path'),
	merge = require('webpack-merge'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	TerserPlugin = require('terser-webpack-plugin');

const sharedConfig = require('./webpack.config');

module.exports = merge(sharedConfig, {
	mode: 'production',

	optimization: {
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			maxSize: 512e3,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/
				}
			}
		},
		minimize: true,
		minimizer: [new TerserPlugin({ extractComments: false })]
	},

	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[sha1:hash:hex:4]'
						}
					},
					'less-loader'
				]
			}
		]
	},

	plugins: [new MiniCssExtractPlugin(), new OptimizeCssAssetsPlugin()]
});
