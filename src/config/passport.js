const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const {
    userService
} = require('../services');

module.exports = () => {
    passport.use(
        new LocalStrategy({
            usernameField: "username",
            passReqToCallback: true
        }, (req, username, password, done) => {
            User.findOne({
                username: username
            }, (err, user) => {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, req.flash('errors', ['Username does not exists']));
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        done(null, false, req.flash('errors', ['Password incorrect'])
                        );
                    }
                })
            })

        })
    );
}

passport.serializeUser(function (user, cb) {
    cb(null, user.username);
})

passport.deserializeUser(function (username, cb) {
    userService.findUser(username).then((user) => {
        cb(null, user);
    })
})