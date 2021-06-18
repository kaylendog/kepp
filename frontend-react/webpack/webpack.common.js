const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	resolve: {
		extensions: [".ts", ".tsx", ".js"],
		alias: {
			"react-dom": "@hot-loader/react-dom",
		},
	},
	context: resolve(__dirname, "../src"),
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: ["ts-loader"],
			},
			{
				test: /\.css$/,
				use: ["style-loader", { loader: "css-loader", options: { importLoaders: 1 } }],
			},
			{
				test: /\.(scss|sass)$/,
				use: ["style-loader", { loader: "css-loader", options: { importLoaders: 1 } }, "sass-loader"],
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					"file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]",
					"image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
				],
			},
		],
	},
	plugins: [new HtmlWebpackPlugin({ template: "index.html.ejs" })],
	externals: {
		react: "React",
		"react-dom": "ReactDOM",
	},
	performance: {
		hints: false,
	},
};
