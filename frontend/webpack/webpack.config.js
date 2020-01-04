const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CheckerPlugin,
	TsConfigPathsPlugin
} = require('awesome-typescript-loader');

module.exports = {
	mode: 'development',
	context: process.cwd(),

	entry: ['./src/index'],

	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'bundle.js'
	},

	resolve: {
		modules: ['node_modules'],
		alias: {
			'react-dom': '@hot-loader/react-dom',
			'~/*': './src/*',
			'@layout/*': './src/layout/*',
			'@pages/*': './src/pages/*',
			'@theme/*': './src/theme/'
		},
		extensions: ['.ts', '.tsx', '.js', '.json'],
		plugins: [new TsConfigPathsPlugin()]
	},

	module: {
		rules: [
			{
				test: /\.ts(x)?$/i,
				exclude: /node_modules/,
				use: {
					loader: 'awesome-typescript-loader',
					options: {
						useBabel: true,
						useCache: true,
						babelCore: '@babel/core'
					}
				}
			},
			{
				test: /\.scss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 8192
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader'
					}
				]
			}
		]
	},
	devtool: 'eval-source-map',
	plugins: [
		new CheckerPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../src/index.html')
		})
	]
};
