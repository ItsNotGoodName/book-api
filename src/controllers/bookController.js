const router = require("express").Router();

router.get("/top", async (req, res) => {
	res.json(await bookService.getTopBooks());
});

router.post(
	"/book/add",
	check("title")
		.not()
		.isEmpty(),
	async (req, res) => {
		let errors = validationResult(req).array();
		if (errors.length > 0) {
			res.json({ errors: errors });
			return;
		}

		const title = req.body.title;
		res.json(await bookService.addBook(title, [{}]));
	}
);

router.post("/addchapter", async (req, res) => {
	const { bookId, title, content } = req.body;
	const book = await bookService.findBookById(bookId);
	await bookService.addChapter(book, title, content);
});
router.post("/getbook", async (req, res) => {});
module.exports = router;
