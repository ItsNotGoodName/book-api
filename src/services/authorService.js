class AuthorService {
	constructor(models) {
		this.models = models;
		this.addAuthor("test").then(data => console.log(data));
	}
	async addAuthor(name) {
		return new this.models.Author({ name }).save();
	}
}
module.exports = AuthorService;
