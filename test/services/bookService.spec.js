const { bookService, authorService } = require("../../src/services");
const { expect } = require("chai");

describe("bookService", () => {
	let name = "Bob";
	let title = "Bill";
	let author;
	let book;
	let chapter;
	let chapterTitle = "Scorpion";
	let chapterBody = "Scorpions are cool";

	before(async () => {
		author = await authorService.addAuthor(name);
		expect(author)
			.to.have.property("name")
			.to.equal(name);
		await bookService.deleteBookByTitle(title);
	});

	it("Add book", async () => {
		book = await bookService.addBook(author, title);
		expect(book)
			.to.have.property("title")
			.to.equal(title);
		expect(book).to.have.property("author");
		expect(book.author).to.have.property("_id");
		expect(book.author)
			.to.have.property("name")
			.to.equal(author.name);
		expect(book.author._id.equals(author._id)).to.be.true;
	});

	it("Find book by Id", async () => {
		const foundBook = await bookService.getBookById(book._id);
		expect(foundBook).to.have.property("author");
		expect(foundBook).to.have.property("_id");
		expect(foundBook._id.equals(book._id)).to.be.true;
		expect(foundBook.author).to.have.property("_id");
	});
	it("Find book by title", async () => {
		const foundBook = await bookService.getBookByTitle(title);
		expect(foundBook).to.have.property("author");
		expect(foundBook).to.have.property("_id");
		expect(foundBook._id.equals(book._id)).to.be.true;
		expect(foundBook.author).to.have.property("_id");
	});

	it("Create Chapter", async () => {
		chapter = await bookService.createChapter(chapterTitle, chapterBody);
		expect(chapter)
			.to.have.property("title")
			.to.equal(chapterTitle);
		expect(chapter)
			.to.have.property("body")
			.to.equal(chapterBody);
	});

	it("Find Chapter", async () => {
		const foundChapter = await bookService.findChapterById(chapter._id);
		expect(foundChapter)
			.to.have.property("title")
			.to.equal(chapterTitle);
		expect(foundChapter)
			.to.have.property("body")
			.to.equal(chapterBody);
		expect(foundChapter)
			.to.have.property("datecreated")
			.to.deep.equal(chapter.datecreated);
	});

	it("Add chapter to book", async () => {
		const newBook = await bookService.addChapterToBook(book, chapter);
		expect(newBook)
			.to.have.property("chapters")
			.that.is.length(1);
		expect(newBook.chapters[0]).to.have.property("_id");
		expect(newBook.chapters[0]._id.equals(chapter._id)).to.be.true;
		expect(newBook.chapters[0])
			.to.have.property("title")
			.to.equal(chapterTitle);
		book = newBook;
	});

	it("Get top books", async () => {
		const top = await bookService.getTopBooks();
		expect(top).to.be.length(1);
		expect(top[0])
			.to.have.property("author")
			.to.have.property("name")
			.to.equal(name);
		expect(top[0])
			.to.have.property("title")
			.to.equal(title);
		expect(top[0])
			.to.have.property("datecreated")
			.to.deep.equal(book.datecreated);
	});

	it("Delete chapter from book", async () => {
		console.log(book);
		console.log(chapter);
		const newBook = await bookService.deleteChapterFromBook(book, chapter);
		console.log(await bookService.getBookById(book._id));
		expect(newBook)
			.to.have.property("chapters")
			.that.is.length(0);
		book = newBook;
	});

	it("Delete Chapter", async () => {
		expect(await bookService.deleteChapter(chapter))
			.to.have.property("deletedCount")
			.to.equal(1);
	});

	it("Delete Book", async () => {
		book = await bookService.addChapterToBook(book, chapter);
		expect(await bookService.deleteBook(book))
			.to.have.property("book")
			.to.have.property("deletedCount")
			.to.equal(1);
		expect(await bookService.findChapterById(chapter._id)).to.be.null;
	});

	after(async () => {
		expect(await authorService.deleteAuthorByName(name))
			.to.have.property("deletedCount")
			.to.equal(1);
	});
});
