const router = require("express").Router();
const passport = require("passport");
const { userService } = require("../services");
const { validationResult, check } = require("express-validator");
const {
	blockAuthenticated,
	forwardAuthenticated
} = require("../middleware/authentication");

const sendUser = (req, res) => {
	let user = req.user.toObject();
	delete user.password;
	res.json({ user: user, success: true });
};
//router.get("/",  sendUser);

router.get("/status", forwardAuthenticated, sendUser);

router.delete("/logout", forwardAuthenticated, (req, res) => {
	req.logout();
	res.json({ success: true });
});

router.get("/author", forwardAuthenticated, (req, res) => {
	res.json(req.user.author);
});

router.post(
	"/author",
	forwardAuthenticated,
	check("authorname")
		.not()
		.isEmpty(),
	async (req, res) => {
		const user = req.user;
		const authorname = req.body.authorname;
		let errors = validationResult(req).array();
		if (errors.length > 0) {
			res.statusCode = 400;
			res.json({ errors: errors });
			return;
		}

		const newUser = await userService.addAuthorToUser(user, authorname);

		if (newUser == null) {
			return res.json({
				success: false, errors: [{ msg: "Authorname was already set" }]
			});
		}

		res.json(newUser);
	}
);

router.use(blockAuthenticated);

router.post(
	"/register",
	check("username")
		.not()
		.isEmpty(),
	check("password")
		.not()
		.isEmpty(),
	async (req, res) => {
		let errors = validationResult(req).array();
		if (errors.length > 0) {
			res.statusCode = 400;
			res.json({ errors: errors });
			return;
		}
		const { username, password } = req.body;

		if (!(await userService.addUser(username, password))) {
			res.json({ errors: [{ msg: "Username is already taken" }] }); // TODO: Add error response
			return;
		}

		res.statusCode = 201;
		res.json({ success: true });
	}
);

router.post("/login", (req, res, next) => {
	passport.authenticate("local", function(err, user, info) {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.json({ errors: [{ msg: "Bad username or password" }] });
		}
		req.logIn(user, function(err) {
			if (err) {
				return next(err);
			}
			return sendUser(req, res);
		});
	})(req, res, next);
});

module.exports = router;
