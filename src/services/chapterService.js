class ChapterService {
	constructor(models) {
		this.models = models;
	}
	async createChapter({ title, body, number }) {
		const chapter = new this.models.Chapter({
			_id: new mongoose.Types.ObjectId(),
			title,
			body,
			number
		});
		return await chapter.save();
	}
	async addChapterToBook(book, chapter) {
		book.chapters.push({ _id: chapter._id });
		return await book.save();
	}
	async deleteChapterFromBook(bok, chapter) {}
}

module.exports = ChapterService;
