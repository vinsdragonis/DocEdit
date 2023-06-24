const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../models/User');

// REGISTER user
router.post("/register", asyncHandler (async(req, res) => {
	try {
		const { name, username, email, password } = req.body;
		((!name || !username || !email || !password) && (
			res.status(400).json({ message: "All fields are required" })
		));
		const duplicateUsername = await User.findOne({ username: username }).lean().exec();
		duplicateUsername && res.status(409).json({ message: "Username already exists" });
		const duplicateEmail = await User.findOne({ email: email }).lean().exec();
		duplicateEmail && res.status(409).json({ message: "Email already exists" });
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		const newUser = new User({
			name: name,
			username: username,
			email: email,
			password: hashedPassword,
			active: true
		});
		const user = await newUser.save();
		res.status(200).json(user);
	} catch(err) {
		res.status(500).json("Internal server error");
	}
}));

// LOGIN user
router.post("/login", asyncHandler (async(req, res) => {
	try {
		((!req.body.username || !req.body.password) && (
			res.status(400).json({ message: "All fields are required" })
		));
		const user = await User.findOne({ username: req.body.username });
		!user && res.status(404).json({ message: "Wrong credentials" });
		const valid = await bcrypt.compare(req.body.password, user.password);
		!valid && res.status(404).json({ message: "Wrong credentials" });
		const { password, ...others } = user._doc;
		res.status(200).json(others);
	} catch(err) {
		res.status(500).json("Internal server error");
	}
}));

module.exports = router;