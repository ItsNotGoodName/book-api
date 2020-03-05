const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
	{
		_id: {
			type: mongoose.Schema.Types.ObjectId,
			default: () => new mongoose.Types.ObjectId()
		},
		title: {
			required: true,
			type: String
		},
		chapters: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Chapter"
			}
		],
		author: {
			required: true,
			type: mongoose.Schema.Types.ObjectId,
			ref: "Author"
		},
		datecreated: {
			type: Date,
			default: () => Date.now()
		}
	},
	{ versionKey: false }
);

module.exports = mongoose.model("Book", bookSchema);
