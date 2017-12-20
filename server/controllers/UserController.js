/**
 * @module UserController
 * @description This module contains methods which extracts the required parameters from the request and forwards them onto the corresponding service layer and return back the result.
 */

const UserService = require('./../services/UserService');
const logger = require('../config/logger.js');

module.exports = {

	getById: async (req, res) => {
		let userId = req.params.userId;
		try {
			let user = await UserService.getById(userId);
			return res.status(200).json(user);
		} catch (err) {
			logger.error('UserController.getById(): ', err);
			return res.status(500).end(err);
		}
	},

	createUser: async (req, res) => {
		let params = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		};

		try {
			let user = await UserService.createUser(params);
			res.status(200).json(user);
		} catch (err) {
			logger.error('AuthController.register(): ', err);
			return res.status(err.statusCode || 500).json(err.message || err);
		}
	},
	getMyProfile: async (req, res) => {
		let userId = req.user._id;
		try {
			let user = await UserService.getMyProfile(userId);
			return res.status(200).json(user);
		} catch (err) {
			logger.error('UserController.getMyProfile(): ', err);
			return res.status(500).end(err);
		}
	},

	getAll: async (req, res) => {
		try {
			let regex = new RegExp(req.query.term, 'i');
			let query = {username: regex};
			let users = await UserService.getAll(query);
			res.status(200).json(users);
		} catch (err) {
			logger.error('UserController.getAll(): ', err);
			res.status(500).end();
		}
	},
	addTaskToUser: async (req, res) => {
		let userId = req.params.userId;
		let taskId = req.body.taskId;
		try {
			let user = await UserService.addTaskToUser(userId, taskId);
			res.status(200).json(user);
		} catch (err) {
			logger.error('TaskController.addTaskToUser(): ', err);
			res.status(500).json(err);
		}
	},
	updateMyProfile: async (req, res) => {
		let userId = req.user._id;
		let params = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
		};
		try {
			let user = await UserService.updateMyProfile(userId, params);
			res.status(200).json(user);
		} catch (err) {
			logger.error('UserController.updateMyProfile(): ', err);
			res.status(500).end();
		}
	},

	updateMyPassword: async (req, res) => {

		let userId = req.user._id;
		let newPassword = req.body.password;
		try {
			let updatedUser = await UserService.updateMyPassword(userId, newPassword);
			res.status(200).json(updatedUser);
		} catch (err) {
			logger.error('UserController.updateMyPassword(): ', err);
			res.status(500).end();
		}
	},

	updateById: async (req, res) => {
		let userId = req.params.userId;
		let params = req.body;
		try {
			let user = await UserService.updateById(userId, params);
			res.status(200).json(user);
		} catch (err) {
			logger.error('UserController.updateById(): ', err);
			res.status(500).end();
		}
	},

	deleteUser: async (req, res) => {
		let userId = req.params.userId;
		try {
			let user = await UserService.removeUser(userId);
			res.status(200).json(user);
		} catch (err) {
			logger.error('UserController.deleteUser(): ', err);
			res.status(500).end();
		}
	},

	deleteMyUser: async (req, res) => {
		let userId = req.user._id;
		try {
			let user = await UserService.removeMyAccount(userId);
			res.status(200).json(user);
		} catch (err) {
			logger.error('UserController.deleteMyUser(): ', err);
			res.status(500).end();
		}
	}

};
