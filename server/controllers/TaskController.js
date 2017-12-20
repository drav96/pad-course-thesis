/**
 * @module TaskController
 * @description This module contains methods which extracts the required parameters from the request and forwards them onto the corresponding service layer and return back the result.
 */

const TaskService = require('./../services/TaskService');
const logger = require('../config/logger.js');

const os = require('os');
const hostname = os.hostname();

module.exports = {

	getTaskById: async (req, res) => {
		let taskId = req.params.taskId;
		let fields = req.query.fields;
		try {
			let task = await TaskService.getTaskById(taskId, fields);
			res.status(200).json(task);

		} catch (err) {
			logger.error('TaskController.getTask(): ', err);
			res.status(500).json(err);
		}
	},

	getTaskList: async (req, res) => {
		try {
			let tasks = await TaskService.getTaskList();
			res.status(200).json(tasks);

		} catch (err) {
			logger.error('TaskController.getTaskList(): ', err);
			res.status(500).json(err);
		}
	},

	createTask: async (req, res) => {
		console.log("This is host ===>>>", `${hostname}`)
		let requestData = {
			name: req.body.name,
			description: req.body.description,
			taskTime: req.body.taskTime
		};
		try {
			let task = await TaskService.createTask(requestData);
			res.status(200).json(task);

		} catch (err) {
			logger.error('TaskController.createTask(): ', err);
			res.status(500).json(err);
		}
	},

	updateTask: async (req, res) => {
		let taskId = req.params.taskId;
		let updatedData = {
			name: req.body.name,
			description: req.body.description,
			status: req.body.status
		};
		try {
			let task = await TaskService.updateTaskById(taskId, updatedData);
			res.status(200).json(task);

		} catch (err) {
			logger.error('TaskController.updateTask(): ', err);
			res.status(500).json(err);
		}
	},

	deleteTask: async (req, res) => {
		let taskId = req.params.taskId;
		try {
			let tasks = await TaskService.removeTaskById(taskId);
			res.status(200).json(tasks);
		} catch (err) {
			logger.error('TaskController.deleteTask(): ', err);
			res.status(500).json(err);
		}
	},

};
