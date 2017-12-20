/**
 * @module IndexRouter
 * @description IndexRouter is responsible for adding all the routes to the middleware chain of the app
 *
 */

let express = require('express');
let router = express.Router();

let taskRouter = require('./task');
let homeRouter = require('./home');
// let userRouter = require('./user');

module.exports = () => {
	router.use('/', homeRouter);
	router.use('/', taskRouter);
	// router.use('/', userRouter);

	return router;
};
