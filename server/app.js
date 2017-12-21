/**
 * Module dependencies
 * @type {*|createApplication}
 */
const express = require('express');

const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');
const redis = require('redis');

/**
 * Create Express server.
 */
const app = express();


/**
 * Express configuration.
 */

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
let client = redis.createClient('6379', 'redis');
console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);
app.get('/index', function(req, res, next) {
	client.incr('counter', function(err, counter) {
		if(err) return next(err);
		res.send('This page has been viewed ' + counter + ' times!');
	});
});
app.use('/', router());

/**
 * Error Handler.
 */
// catch 404 and forward to error handler
app.use(function (req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
