/**
 * @module UsersRouter
 * @description UsersRouter is responsible forwarding request to appropriate {@link UserController} method
 *
 */
const express = require('express');
const router = express.Router();


const UserController = require('../controllers/UserController');

router.get('/users/my/profile', UserController.getMyProfile);

router.put('/users/my/profile', UserController.updateMyProfile);

router.post('/users', UserController.createUser);

router.put('/users/my/password', UserController.updateMyPassword);

router.put('/users/:userId/task', UserController.addTaskToUser);

router.delete('/users/my', UserController.deleteMyUser);


//Authorized routes
router.get('/admin/users/:userId', UserController.getById);

router.get('/admin/users', UserController.getAll);

router.put('/admin/users/:userId', UserController.updateById);


router.delete('/admin/users/:userId', UserController.deleteUser);

module.exports = router;
