module.exports = {
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	ignorePatterns: ["dist", "node_modules", "examples", "scripts", "**/.eslintrc.js"],
};
