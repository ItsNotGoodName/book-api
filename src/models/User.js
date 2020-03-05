const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		username: {
			required: true,
			type: String
		},
		password: {
			required: true,
			type: String
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			default: null,
			ref: "Author"
		},
		date: {
			type: Date,
			default: () => Date.now()
		}
	},
	{ versionKey: false }
);

module.exports = mongoose.model("User", userSchema);
