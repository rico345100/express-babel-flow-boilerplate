/* @flow */
// const Auth = require('../../collections/Auth');
const express = require('express');
const router = express.Router();
const co = require('co');

const { checkHasNull, compareHash, generateHash } = require('../../libs/utils');
const { authRequired } = require('../../libs/middlewares');
const { BadRequestError } = require('../../libs/exceptions');

const session = require('../../libs/session');

router.post('/', (req, res, next) => {
	co(function*() {
		try {
			// status init value is 400, so if it fails, will return 400 Bad Request.
			yield checkHasNull(req.body, ['id', 'password']);

			// Add your own authentication logic. Reject if is wrong.
			/*
			let loginData = yield Auth.get({ id: req.body.id });
			
			if(loginData.length === 0) {
				throw new BadRequestError('Invalid ID or Password');
			}

			let hash = loginData[0].password;
			let loginResult = yield compareHash(req.body.password, hash);

			if(!loginResult) {
				throw new BadRequestError('Invalid ID or Password');
			}
			*/

			// Regenerate session for defend from session hijacking.
			yield session.regenerate(req);

			req.session.auth = true;
			req.session.user = {
				id: req.body.id
			};
			
			yield session.save(req);

			res.json({});
		}
		catch(err) {
			return next(err);
		}
	});

});

router.delete('/', (req, res, next) => {
	co(function*() {
		try {
			yield session.destroy(req);

			res.json({});
		}
		catch(err) {
			return next(err);
		}
	});
});

router.get('/session', (req, res, next) => {
	res.json({
		session: req.session
	});
});

module.exports = router;