const router = require("express").Router();
const passport = require("passport");
const { userService } = require("../services");
const {
	blockAuthenticated,
	forwardAuthenticated
} = require("../middleware/authentication");

// router.get("/", async (req, res) => {
// 	res.render("user", {
// 		users: await userService.getAllUsers()
// 	});
// });

router.delete("/logout", (req, res) => {
	req.logout();
	res.json({ success: true });
});

// router.get("/profile", forwardAuthenticated, (req, res) => {
// 	res.render("profile");
// });

// router.post("/delete", forwardAuthenticated, (req, res) => {
// 	let user = req.user;
// 	userService.deleteUserByUsername(user.username);
// 	res.send("You are dead");
// });

router.use(blockAuthenticated);

router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	if (!(await userService.addUser(username, password))) {
		res.json({ success: false });
		return;
	}
	res.json({ success: true });
});

router.post("/login", passport.authenticate("local"));

module.exports = router;
