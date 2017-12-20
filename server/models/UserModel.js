'use strict';
/**
 * @module UserModel
 * @description  This module defines the shape of the documents within users collection and convert {@link UserSchema} to a model.
 */

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
/**
 * User Schema
 */

const UserSchema = new Schema({
	username: {type: String},
	firstName: String,
	lastName: String,
	email: {type: String, required: true, unique: true},
	password: {type: String},
	avatar: {type: String},
	tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
}, {
	timestamps: true
});

/**
 * Methods
 */

/**
 *
 * @param password
 */
UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};
/**
 * Helper method for getting user's gravatar.
 */
UserSchema.statics.gravatar = function (size, email) {
	if (!size) {
		size = 200;
	}
	if (!email) {
		return `https://gravatar.com/avatar/?s=${size}&d=retro`;
	}
	const md5 = crypto.createHash('md5').update(email).digest('hex');
	return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
