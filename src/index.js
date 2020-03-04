const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoConnection = require("./config/db").connection;
const app = express();
require("./config/passport")();

// Disable
app.disable("x-powered-by");

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: process.env.SESSION_SECRET || "secret",
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({
			mongooseConnection: mongoConnection
		})
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
	express.urlencoded({
		extended: false
	})
);

// Copy user to requesting user to local user
//app.use((req, res, next) => {
//  if (typeof req.user != undefined) {
//    res.locals.user = req.user;
//  }
//  return next();
//});

if (process.env.NODE_ENV === "production") {
	// Production
} else {
	// Development
	app.use(morgan("dev"));
}

// Controllers
const { homeController, apiController } = require("./controllers");

app.use("/", homeController);
app.use("/api/v1/", apiController);

module.exports = app;
