module.exports = {
	extends: "../.eslintrc.js",
	env: {
		node: true,
	},
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: "./tsconfig.json",
	},
};
