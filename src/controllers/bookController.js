const router = require("express").Router();
const { isValid } = require("mongoose").Types.ObjectId;
const { bookService } = require("../services");
const { check } = require("express-validator");
const { forwardAuthenticated } = require("../middleware/authentication");
const { errorHandler } = require("../middleware/errorHandler");

router.get("/top", async (req, res) => {
	res.json(await bookService.getTopBooks());
});

const parsebook = async (req, res, next) => {
	const { bookid } = req.params;

	if (!isValid(bookid)) {
		res.statusCode = 400;
		res.json({ errors: [{ msg: "Not a valid book id" }] });
		return;
	}

	const book = await bookService.getBookById(bookid);

	if (!book) {
		res.statusCode = 404;
		res.json({ errors: [{ msg: "Book does not exist" }] });
		return;
	}

	res.locals.book = book;
	next();
};
const parsechapter = async (req, res, next) => {
	const { chapterid } = req.params;

	if (!isValid(chapterid)) {
		res.statusCode = 400;
		res.json({ errors: [{ msg: "Not a valid chapter id" }] });
		return;
	}

	const chapter = await bookService.findChapterById(chapterid);

	if (!chapter) {
		res.statusCode = 404;
		res.json({ errors: [{ msg: "Chapter does not exist" }] });
		return;
	}

	res.locals.chapter = chapter;
	next();
};

const userownsbook = async (req, res, next) => {
	if (!res.locals.book.author._id.equals(req.user.author._id)) {
		res.json({ errors: [{ msg: "You do not own this book" }] });
		return;
	}
	next();
};

router.get("/chapter/:chapterid", parsechapter, async (req, res) => {
	res.json(res.locals.chapter);
});

router.get("/:bookid/", parsebook, async (req, res) => {
	res.json(res.locals.book);
});

router.use(forwardAuthenticated);

router.post(
	"/",
	check("title")
		.not()
		.isEmpty(),
	errorHandler,
	async (req, res) => {
		const title = req.body.title;

		const book = await bookService.addBook(req.user.author, title);
		if (!book) {
			res.json({ errors: [{ msg: "Book title already taken" }] });
			return;
		}

		res.json(book);
	}
);
router.delete("/:bookid", parsebook, userownsbook, async (req, res) => {
	const { book } = res.locals;
	let deleteBook = await bookService.deleteBook(book);
	deleteBook.success = true;
	res.json(deleteBook);
});

router.delete(
	"/:bookid/chapter/:chapterid",
	parsebook,
	parsechapter,
	userownsbook,
	async (req, res) => {
		const { book, chapter } = res.locals;
		bookService.deleteChapter(chapter);
		res.json(await bookService.deleteChapterFromBook(book, chapter));
	}
);

router.post(
	"/:bookid/chapter",
	parsebook,
	userownsbook,
	check("title")
		.not()
		.isEmpty(),
	check("body")
		.not()
		.isEmpty(),
	errorHandler,
	async (req, res) => {
		const { title, body } = req.body;

		const book = res.locals.book;

		const chapter = await bookService.createChapter(title, body);

		const newBook = await bookService.addChapterToBook(book, chapter);

		res.json(newBook);
	}
);
router.post("/getbook", async (req, res) => {});
module.exports = router;
