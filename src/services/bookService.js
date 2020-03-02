const mongoose = require("mongoose");
class BookService {
	constructor(models) {
		this.models = models;
	}

	async addBook(author, title) {
		const book = new this.models.Book({
			_id: new mongoose.Types.ObjectId(),
			title,
			author
		});
		return await book.save();
	}

	async getBookById(_id) {
		return await this.models.Book.find({ _id });
	}

	async getChapterById(_id) {
		return await this.models.Chapter.find({ _id });
	}

	async getTopBooks() {
		return await this.models.Book.find({});
	}
}

module.exports = BookService;
