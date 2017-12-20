/**
 * @module UserService
 * @description :: This module contains methods that do something for UserController, manages every interaction with datastore regarding users collections.
 */
const User = require('../models/UserModel');

module.exports = {

	/**
	 *
	 * @param {string} userId
	 * @returns {Promise}
	 */

	getById: async (userId) => {
		try {
			return await User.findById(userId).select('-password');
		} catch (err) {
			throw err;
		}
	},

	/**
	 *
	 * @param id
	 * @returns {Promise<*>}
	 */
	getMyProfile: async (id) => {
		let userId = id.toString();
		try {
			return await User.findById(userId).select('-password');
		} catch (err) {
			throw err;
		}
	},

	/**
	 *
	 * @param query
	 * @returns {Promise<*>}
	 */
	getAll: async (query) => {
		try {
			return await User.find(query).select('-password');
		} catch (err) {
			throw err;
		}
	},
	createUser: async (newUser) => {
		newUser.avatar = User.gravatar('', newUser.email);
		try {
			let existingUser = await User.findOne({$or: [{username: newUser.username}, {email: newUser.email}]});

			if (!existingUser) {
				return await User.create(newUser);
			}

			if (!existingUser.isActive) {
				return await User.findByIdAndUpdate({_id: existingUser._id}, {$set: newUser}, {new: true});
			}

			if (existingUser.email === newUser.email) {
				throw new errors.EmailUsedError();
			}

			if (existingUser.username === newUser.username) {
				throw new errors.UsernameUsedError();
			}

		} catch (err) {
			throw err;
		}
	},

	addTaskToUser: async (taskId, userId) => {
		try {
			return await User.findByIdAndUpdate(userId,
				{
					$push: {"tasks": taskId}
				},
				{safe: true, upsert: true});
		} catch (err) {
			throw(err)
		}
	},

	/**
	 *
	 * @param {string} userId
	 * @param {Object} params
	 * @returns {Promise.<*>}
	 */
	updateMyProfile: async (userId, params) => {
		let dataToUpdate = {
			firstName: params.firstName,
			lastName: params.lastName,
		};
		try {
			return await User.findByIdAndUpdate(userId, dataToUpdate, {new: true}).select('-password');
		} catch (err) {
			throw err;
		}
	},

	/**
	 *
	 * @param {string} userId
	 * @param {string} newPassword
	 * @returns {Promise.<*>}
	 */
	updateMyPassword: async (userId, newPassword) => {
		try {
			return await User.findByIdAndUpdate(userId, {
				$set: {password: newPassword}
			}).select('_id username email');
		} catch (err) {
			throw err;
		}
	},

	/**
	 *
	 * @param {string} userId
	 * @param {Object} dataToUpdate
	 * @returns {Promise.<*>}
	 */
	updateById: async (userId, dataToUpdate) => {
		try {
			return await User.findByIdAndUpdate(userId,
				{$set: dataToUpdate},
				{new: true});
		} catch (err) {
			throw err;
		}
	},
	/**
	 *
	 * @param {string} userId
	 * @returns {Promise.<*>}
	 */
	removeUser: async (userId) => {
		try {
			return await User.remove(userId);
		} catch (err) {
			throw err;
		}
	},

	/**
	 *
	 * @param userId
	 * @returns {Promise<*>}
	 */
	removeMyAccount: async (userId) => {
		try {
			return await User.remove({_id: userId});
		} catch (err) {
			throw err;
		}
	},

};
