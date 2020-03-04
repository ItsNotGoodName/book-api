const router = require("express").Router();
const userController = require("./userController");
const bookController = require("./bookController");

router.use("/user/", userController);
router.use("/book/", bookController);

module.exports = router;
