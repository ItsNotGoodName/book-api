const mongoose = require("mongoose");
class BookService {
	constructor(models) {
		this.models = models;
	}

	async addBook(author, title) {
		if ((await this.getBookByTitle(title)) != null) {
			return null;
		}
		const book = new this.models.Book({
			_id: new mongoose.Types.ObjectId(),
			title,
			author
		});
		return await book.save();
	}
	async getBookByTitle(title) {
		return await this.models.Book.findOne({ title })
			.populate("chapters", "title")
			.populate("author", "name");
	}

	async getBookById(_id) {
		return await this.models.Book.findOne({ _id })
			.populate("chapters", "title")
			.populate("author", "name");
	}

	async getTopBooks() {
		return await this.models.Book.find({})
			.populate("author", "name")
			.select("-chapters")
			.limit(25);
	}

	async deleteBook(book) {
		const deletedChapters = await this.models.Chapter.deleteMany({
			_id: { $in: book.chapters }
		});
		const deletedBook = await this.models.Book.deleteOne({ _id: book._id });
		return { book: deletedBook, chapters: deletedChapters };
	}

	async deleteBookByTitle(title) {
		return this.models.Book.deleteOne({ title });
	}

	async createChapter(title, body) {
		const chapter = new this.models.Chapter({
			_id: new mongoose.Types.ObjectId(),
			title,
			body
		});
		return await chapter.save();
	}

	async findChapterById(_id) {
		return await this.models.Chapter.findOne({ _id });
	}

	async deleteChapter(chapter) {
		return await this.models.Chapter.deleteOne(chapter);
	}

	async addChapterToBook(book, chapter) {
		await this.models.Book.updateOne(
			{ _id: book._id },
			{ $push: { chapters: { _id: chapter._id, title: chapter.title } } }
		);
		return await this.getBookById(book._id);
	}
	async deleteChapterFromBook(book, chapter) {
		await this.models.Book.updateOne(
			{ _id: book._id },
			{
				$pull: { chapters: { _id: chapter._id } } // Wasted my time with $pull not working so using $unset
			}
		);

		return await this.getBookById(book._id);
	}
}

module.exports = BookService;
