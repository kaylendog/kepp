const DEFAULT_ENVIRONMENT = {
	BACKEND_URI: 'http://localhost:8080',
	WS_PORT: 6879
};

module.exports = withDefaults = (env) => ({
	...DEFAULT_ENVIRONMENT,
	...env
});
