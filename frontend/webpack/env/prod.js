module.exports = require('./defaults')({
	BACKEND_URI: process.env.BACKEND_URI,
	WS_PORT: Number(process.env.WS_PORT)
});
