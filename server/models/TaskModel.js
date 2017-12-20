'use strict';
/**
 * @module TaskModel
 * @description  This module defines the shape of the documents within tasks collection and convert {@link TaskSchema} to a model.
 */

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Task Schema
 */
const TaskSchema = new Schema({
	name: String,
	description: String,
	status: String,
	time: {
		taskTime: Number,
		bonusTime: Number,
	},
}, {
	timestamps: true
});


const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
