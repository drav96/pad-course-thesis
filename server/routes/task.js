/**
 * @module TaskRouter
 * @description TaskRouter is responsible forwarding request to appropriate {@link TaskController} method
 *
 */

const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/TaskController');

router.get('/tasks', TaskController.getTaskList);

router.get('/tasks/:taskId', TaskController.getTaskById);

router.post('/tasks', TaskController.createTask);

router.put('/tasks/:taskId', TaskController.updateTask);

router.delete('/tasks/:taskId', TaskController.deleteTask);

module.exports = router;
