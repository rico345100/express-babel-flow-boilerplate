/* @flow */
const config = require('../config/app.json');
global.isDev = config.environment === 'development' ? true : false;

if(global.isDev) {
	require('source-map-support/register');
}

const express = require('express');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
// Uncomment this line and install connect-redis if you want to use RedisStore as Session Store.
// const RedisStore = require('connect-redis')(session);

const { ResourceNotFoundError } = require('./libs/exceptions');

app.disable('x-powered-by');

app.use(express.static(__dirname + '/data'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'your_secret_key',
	resave: false,
	saveUninitialized: false,
	maxAge: 1000 * 60 * 60,		// 1 hour,
	// store: new RedisStore({
	// 	ttl: 1000 * 60 * 60
	// })
}));

// CORS
app.use((req, res, next) => {
	var allowedOrigins = [
		'http://localhost:3300',
		'http://localhost:3301',
		// Add your domains
	];
	var origin = req.headers.origin;

	if(allowedOrigins.indexOf(origin) > -1){
		res.setHeader('Access-Control-Allow-Origin', origin);
	}

	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, HEAD');

	if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

	next();
});

// Serving Favicon
// If you want to cache this, consider using 'serve-favicon' package.
app.get('/favicon.ico', (req, res, next) => {
	return res.sendFile(__dirname + '/favicon.ico');
});

// Serving Robots.txt
// By default, hide everything.
// If you want to expose every content, remove '/' of second line like this:
// robots += `Disallow: `;
app.get('/robots.txt', function (req, res) {
    var robots = `User-agent: *\n`;
    robots += `Disallow: /`;
    
    res.type('text/plain');
    res.send(robots);
});

app.use(require('./routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
	const err = new ResourceNotFoundError('Not Found');
	return next(err);
});

// error handler
app.use((err, req, res, next) => {
	if(global.isDev) {
		console.error(err.message);
		console.error(err.stack);
	}

	let statusCode:number = 500;

	if(typeof err.statusCode !== 'undefined') {
		statusCode = err.statusCode;
	}
	
	res.status(statusCode).json({
		message: err.message,
		stack: global.isDev ? err.stack : {}
	});
});

app.listen(config.port, () => console.log(`Express Server listening at port ${config.port}...`));