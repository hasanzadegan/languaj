const passport = require("passport");
const global = require('../routes/_global');
const keys = require("../config/key");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../user/user");
const session = require("express-session");
var jwt = require('jsonwebtoken');


module.exports = function (app) {
    passport.use(new GoogleStrategy({
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
            callbackURL: keys.google.callbackURL
        },
        function (accessToken, refreshToken, profile, cb) {
            User.findOrCreate(profile, function (err, user) {
                user.ref = global.getBase64(user.userId);
                user.token = jwt.sign({user: user}, keys.jwt.key, {expiresIn: 60 * 60 * 24 * 30});
                return cb(err, user);
            });
        }
    ));
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((userDataFromCookie, done) => {
        done(null, userDataFromCookie);
    });

    app.use(session({
        secret: keys.session.cookieKey,
        resave: false,
        saveUninitialized: false,
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/protected', (req, res) => {
        res.json({
            message: 'You have accessed the protected endpoint!',
            yourUserInfo: req.user,
        });
    });

    app.get('/api/users/me', function (req, res) {
        res.json(req.user);
    });

    app.get('/api/checkJWT', function (req, res) {
        token = req.headers.authorization.replace("Bearer ","");
        jwt.verify(token, keys.jwt.key, function(err, decoded) {
            res.json({decoded:decoded});
        });
    });

    app.post('/api/impersonate', async (req, res) => {
        var user = await global.getUser(req)

        if ([11, 12].includes(user.userId)) {
            user = {userId: req.body.userId, emails: [{value: req.body.email}]};
            req.session.user = user;
        }
        res.send(user);
    });
    app.get('/api/clearImpersonate', (req, res) => {
        req.session.user = undefined;
        res.send("ok");
    });
    app.get('/api/auth/google', passport.authenticate('google', {
        scope: [
            'profile',
            'email'
        ]
    }));
    app.get('/api/auth/google/redirect', passport.authenticate('google', {failureRedirect: '/login'}), function (req, res) {
        req.session.email = req.user.email;
        res.redirect('/student.html');
    });
    app.get("/api/auth/logout", (req, res) => {
        req.logout();
        res.redirect('/login');
    });

}

