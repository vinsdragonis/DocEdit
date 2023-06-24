const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

const Doc = require('../models/Doc');
const User = require('../models/User');

// CREATE new doc
router.post("/", asyncHandler(async (req, res) => {
	try {
		const { name, author, content, type } = req.body;
		if (!name ||
			!author ||
			// !content ||
			!type
		) {
			return res.status(400).json({ message: "All fields are required" });
		};
		const user = await User.findById(author).lean().exec();
		!user && (res.status(404).json("User not found"));
		const duplicateDocs = await Doc.find({ name: name, author: author }).lean().exec();
		// if (duplicateDocs) {
		// 	return res.status(409).json({ message: "Doc already exists" })
		// 	name = name + "(duplicate)";
		// }
		const newDoc = new Doc({
			name: name,
			author: author,
			content: content,
			type: type,
			readAccess: author,
			writeAccess: author
		});
		const doc = await newDoc.save();
		res.status(200).json(doc);
	} catch (err) {
		res.status(500).json(err);
	}
}));

// GET all docs owned by a user
router.get("/u/:id/l/:limit", asyncHandler(async (req, res) => {
	const author = req.params.id;
	// console.log(req.prarams);
	// console.log(author);
	if (!author) {
		return res.status(400).json("Author ID required");
	}
	// console.log(author);
	try {
		const user = await User.findById(author).exec();
		if (!user) {
			return res.status(404).json("User not found");
		};
		// console.log(user);
		const docs = await Doc.find({ author: user._id }).sort({ updatedAt: -1 }).limit(req.params.limit).lean().exec();
		// if (docs.length === 0) {
		// 	return res.status(404).json({ message: 'No docs found' });
		// }
		res.status(200).json(docs);
	} catch (err) {
		res.status(500).json(err);
	}
}));

// GET a specific doc owned by a user
router.get("/u/:id/d/:docId", asyncHandler(async (req, res) => {
	try {
		const author = req.params.id;
		const docId = req.params.docId;
		if (!author) {
			return res.status(400).json({ message: "Author's approval is required to access this doc" });
		}
		const user = await User.findById(author).lean().exec();
		!user && (res.status(404).json("User not found"));
		const doc = await Doc.findById(docId).lean().exec();
		!Doc && (res.status(404).json('Doc not found'));
		const reqUser = JSON.stringify(author);
		const docAuth = JSON.stringify(doc.author);
		if (reqUser !== docAuth)
			return res.status(401).json("Unauthorized access to doc");
		res.status(200).json(doc);
	} catch (err) {
		res.status(500).json(err);
	}
}));

// UPDATE a specific doc
router.put("/:id", asyncHandler(async (req, res) => {
	const { author } = req.body;
	if (!author) {
		return res.status(400).json({ message: "Author's approval is required to access this doc" });
	}
	try {
		const user = await User.findById(author).lean().exec();
		!user && (res.status(404).json("User not found"));
		const doc = await Doc.findById(req.params.id).lean().exec();
		!Doc && (res.status(404).json('Doc not found'));
		const reqUser = JSON.stringify(author);
		const docAuth = JSON.stringify(doc.author);
		if (reqUser !== docAuth)
			return res.status(401).json("Unauthorized access to doc");
		try {
			const updatedDoc = await Doc.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body
				},
				{
					new: true
				}
			);
			res.status(200).json(updatedDoc);
		} catch (err) {
			res.status(500).json(err);
		}
	} catch (err) {
		res.status(500).json(err);
	}
}));

// DELETE a specific doc
router.delete("/:id", asyncHandler(async (req, res) => {
	const { author } = req.body;
	if (!author) {
		return res.status(400).json({ message: "Author's approval is required to delete this doc" });
	}
	try {
		const user = await User.findById(author).lean().exec();
		!user && (res.status(404).json("User not found"));
		const doc = await Doc.findById(req.params.id).lean().exec();
		!Doc && (res.status(404).json('Doc not found'));
		const reqUser = JSON.stringify(author);
		const docAuth = JSON.stringify(doc.author);
		if (reqUser !== docAuth)
			return res.status(401).json("Unauthorized access to doc");
		try {
			await Doc.deleteOne({ _id: req.params.id });
			res.status(200).json("Doc has been deleted");
		} catch (err) {
			res.status(500).json("Unable to delete doc");
		}
	} catch (err) {
		res.status(500).json(err);
	}
}));

module.exports = router;