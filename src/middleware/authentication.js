const forwardAuthenticated = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.json({ errors: [{ msg: "Loging required" }] });
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
