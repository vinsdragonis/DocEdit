const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = require('../models/User');
const Doc = require('../models/Doc');

// GET user by ID
router.get("/:id", asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		!user && res.status(404).json("User not found");
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch (err) {
		res.status(500).json(err);
	}
}));

// UPDATE user
router.put("/:id", asyncHandler(async (req, res) => {
	const { id, username, name, email, active, password, desc } = req.body;
	if (
		!id ||
		!username ||
		typeof active !== 'boolean'
	) {
		return res.status(400).json({ message: "All fields are required" });
	}
	const user = await User.findById(id).exec();
	if (user.username !== req.body.username) {
		const duplicateUsername = await User.findOne({ username }).lean().exec();
		if (duplicateUsername && duplicateUsername?._id.toString() !== id) {
			return res.status(409).json({ message: "Username already exists" });
		}
	}
	const duplicateEmail = await User.findOne({ email }).lean().exec();
	if (duplicateEmail && duplicateEmail?._id.toString() !== id) {
		return res.status(409).json({ message: "Email already exists" });
	}
	if (password) {
		const salt = await bcrypt.genSalt(10);
		req.body.password = await bcrypt.hash(password, salt);
	}
	try {
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				$set: req.body
			},
			{
				new: true
			}
		);
		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json(err);
	}
}));

// DELETE user
router.delete("/:id", asyncHandler(async (req, res) => {
	const { id } = req.body;
	if (!id) {
		return res.status(400).json({ message: "User ID required" });
	}
	if (req.params.id !== id) return res.status(401).json({ message: "Can't delete another account" });
	const user = await User.findById(id).exec();
	if (!user) {
		return res.status(404).json({ message: "User not found" });
	}
	const docs = await Doc.deleteMany({ author: id });
	const result = await user.deleteOne();
	const reply = `User ${result.username} with ID ${result.id} has been deleted`;
	res.status(201).json(reply);
}));

module.exports = router;