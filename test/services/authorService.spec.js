const { authorService } = require("../../src/services");
const { expect } = require("chai");

describe("authorService", () => {
	let name = "Bob";
	let author;
	let _id;
	it("Add Author", async () => {
		author = await authorService.addAuthor(name);
		_id = author._id;
	});

	it("Find Author By Name", async () => {
		let foundAuthor = await authorService.findAuthorByName(name);
		expect(foundAuthor)
			.to.have.property("name")
			.to.equal(name);
	});
	it("Find Author By Id", async () => {
		let foundAuthor = await authorService.findAuthorById(_id);
		console.log(foundAuthor._id);
		expect(foundAuthor)
			.to.have.property("_id")
			.to.equal(_id);
	});

	it("Deleted Author by name", async () => {
		const deletedAuthor = await authorService.deleteAuthorByName(name);
		expect(deletedAuthor)
			.to.have.property("deletedCount")
			.to.equal(1);
	});
});
