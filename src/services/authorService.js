class AuthorService {
	constructor(models) {
		this.models = models;
	}
	async addAuthor(name) {
		if ((await this.findAuthorByName(name)) != null) {
			return null;
		}
		return new this.models.Author({ name }).save();
	}
	async findAuthorByName(name) {
		return await this.models.Author.findOne({ name });
	}
	async findAuthorById(_id) {
		return await this.models.Author.findOne({ _id });
	}

	async deleteAuthorByName(name) {
		return this.models.Author.deleteOne({ name });
	}
}
module.exports = AuthorService;
