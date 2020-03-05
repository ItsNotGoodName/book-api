const mongoose = require("mongoose");

const authorSchema = mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId()
		},
		name: {
			required: true,
			type: String
		},
		dateCreated: {
			type: Date,
			default: () => Date.now()
		}
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Author", authorSchema);
