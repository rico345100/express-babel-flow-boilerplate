/* @flow */
const express = require('express');
const router = express.Router();
const co = require('co');
const { authRequired } = require('../libs/middlewares');

// Basic usage
router.get('/', (req, res, next) => {
	res.json({
		message: 'Helloworld!'
	});
});

// Async usage with Promisified API
router.get('/async', (req, res, next) => {
	co(function*() {
		try {
			const someAsyncJob = yield new Promise.resolve('Hello!');

			res.json({
				message: someAsyncJob
			});
		}
		catch(err) {
			next(err);
		}
	});
});

// External Routes
router.use('/auth', require('./Auth'));

router.get('/private', authRequired, (req, res, next) => {
	res.json({
		message: 'Private Route Access Granted'
	});
});

module.exports = router;