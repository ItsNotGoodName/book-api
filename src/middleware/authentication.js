const forwardAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.statusCode = 401;
	res.json({ errors: [{ msg: "Login required" }] });
};

const blockAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		return next();
	}
	res.json({ errors: [{ msg: "Already Logged In" }] });
};

module.exports = {
	forwardAuthenticated,
	blockAuthenticated
};
