/**
 * @module TaskService
 * @description :: This module contains methods that do something for TaskController, manages every interaction with datastore regarding tasks collections.
 */

const Task = require('../models/TaskModel');
module.exports = {


	/**
	 *
	 * @param taskId
	 * @param fields
	 * @returns {Promise<*>}
	 */
	getTaskById: async (taskId, fields) => {
		try {
			return await Task.findById(taskId).select(fields);
		} catch (err) {
			throw err;
		}
	},

	/**
	 *
	 * @returns {Promise.<*>}
	 */
	getTaskList: async () => {
		try {
			return await Task.find({});
		} catch (err) {
			throw err;
		}
	},

	/**
	 *
	 * @param {Object} data
	 * @returns {Promise.<*>}
	 */
	createTask: async (data) => {

		let newTask = {
			name: data.name,
			description: data.description,
			time: {
				taskTime: data.taskTime,
				bonusTime: data.taskTime / 2
			},
			status: "INITIAL"
		};
		try {
			return await Task.create(newTask);
		} catch (err) {
			throw err;
		}
	},

	/**
	 *
	 * @param taskId
	 * @param data
	 * @returns {Promise.<*>}
	 */
	updateTaskById: async (taskId, data) => {
		let taskToUpdate = {};
		if (data.name) {
			taskToUpdate.name = data.name;
		}
		if (data.description) {
			taskToUpdate.description = data.description;
		}
		if (data.status) {
			taskToUpdate.status = data.status;
		}
		try {
			return await Task.findByIdAndUpdate(
				{_id: taskId},
				{
					$set: taskToUpdate
				},
				{new: true});
		} catch (err) {
			throw err;
		}
	},
	/**
	 *
	 * @param {string} taskId
	 * @returns {Promise.<*>}
	 */
	removeTaskById: async (taskId) => {
		try {
			return await Task.remove({_id: taskId});
		} catch (err) {
			throw err;
		}
	},


};
