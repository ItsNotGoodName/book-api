const router = require("express").Router();
const passport = require("passport");
const { userService } = require("../services");
const { validationResult, check } = require("express-validator");
const {
	blockAuthenticated,
	forwardAuthenticated
} = require("../middleware/authentication");

router.delete("/logout", (req, res) => {
	req.logout();
	res.json({ success: true });
});

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
			return res.json({ success: true });
		});
	})(req, res, next);
});

module.exports = router;
