const user = require('./user');
const message = require('./message');

module.exports = function(app){
	app.use('/api/message', message);
	app.use('/api/user', user);
};
