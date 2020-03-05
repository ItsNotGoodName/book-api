const mongoose = require("mongoose");

const chapterSchema = mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId()
		},
		number: Number,
		title: {
			required: true,
			type: String
		},
		body: {
			required: true,
			type: String
		},
		datecreated: {
			type: Date,
			default: () => Date.now()
		}
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Chapter", chapterSchema);
