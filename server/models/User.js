const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		username: {
			type: String,
			required: true,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		profilePic: {
			type: String,
			required: true,
			default: "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png"
		},
		desc: {
			type: String,
			default: "Hey there! I am new around here."
		},
		active: {
			type: Boolean,
			required: true,
			default: true
		}
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("User", userSchema);