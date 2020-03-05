const { validationResult } = require("express-validator");
const errorHandler = (req, res, next) => {
	let errors = validationResult(req).array();
	if (errors.length > 0) {
		res.json({ errors: errors });
		return;
	}
	next();
};

module.exports = {
	errorHandler
};
