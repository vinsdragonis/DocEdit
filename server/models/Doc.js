const mongoose = require('mongoose');

const docSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User"
		},
		content: {
			type: String,
			// required: true,
			default: ""
		},
		type: {
			type: String,
			required: true,
			default: "Note"
		},
		readAccess: [{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User"
		}],
		writeAccess: [{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User"
		}]
	},
	{
		timestamps: true
	}
);

module.exports = mongoose.model("Doc", docSchema);