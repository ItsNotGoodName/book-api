const { authorService } = require("../../src/services");
const { expect } = require("chai");

describe("authorService", () => {
	let name = "Bob";
	let author;
	let _id;

	//before(async () => {
	//await authorService.deleteAuthorByName(name);
	//});

	it("Add Author", async () => {
		author = await authorService.addAuthor(name);
		_id = author._id;
		expect(author)
			.to.have.property("name")
			.to.equal(name);
	});

	it("Find Author By Name", async () => {
		let foundAuthor = await authorService.getAuthorByName(name);
		expect(foundAuthor)
			.to.have.property("name")
			.to.equal(name);
		expect(foundAuthor._id.equals(author._id)).to.be.true;
	});
	it("Find Author By Id", async () => {
		let foundAuthor = await authorService.getAuthorById(_id);
		expect(foundAuthor).to.have.property("_id");
		expect(foundAuthor._id.equals(author._id)).to.be.true;
	})("Deleted Author by name", async () => {
		const deletedAuthor = await authorService.deleteAuthorByName(name);
		expect(deletedAuthor)
			.to.have.property("deletedCount")
			.to.equal(1);
	});
	it("Should not be able to find by id", async () => {
		expect(await authorService.getAuthorById(_id)).to.be.null;
	});
	it("Should not be able to find by name", async () => {
		expect(await authorService.getAuthorById(_id)).to.be.null;
	});
});
