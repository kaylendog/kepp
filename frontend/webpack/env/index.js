const prod = require('./prod'),
	dev = require('./dev');

module.exports = process.env.NODE_ENV === 'production' ? prod : dev;
