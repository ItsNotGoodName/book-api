class AuthorService {
	constructor(models) {
		this.models = models;
	}
	async addAuthor(name) {
		if ((await this.getAuthorByName(name)) != null) {
			return null;
		}
		return new this.models.Author({ name }).save();
	}
	async getAuthorByName(name) {
		return await this.models.Author.findOne({ name });
	}
	async getAuthorById(_id) {
		return await this.models.Author.findOne({ _id });
	}

	async deleteAuthorByName(name) {
		return this.models.Author.deleteOne({ name });
	}
}
module.exports = AuthorService;
