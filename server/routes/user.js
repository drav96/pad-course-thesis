/**
 * @module UserRouter
 * @description UserRouter is responsible forwarding request to appropriate {@link UserController§} method
 *
 */

const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController');

router.get('/users', UserController.getUserList);

router.get('/users/:userId', UserController.getUserById);

router.post('/users', UserController.createUser);

router.put('/users/:userId', UserController.updateUser);

router.delete('/users/:userId', UserController.deleteUser);

module.exports = router;
