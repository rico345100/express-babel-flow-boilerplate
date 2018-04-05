/* @flow */
const { UnauthorizedError } = require('./exceptions');

// Change this middleware to check your own authentication logic.
// For example, by default, it checks req.session.auth is set or not.
function authRequired(req:any, res:any, next: Function) {
	if(!req.session.auth) {
		return next(new UnauthorizedError('Unauthorized Request'));
	}

	next();
}

module.exports = {
	authRequired
};