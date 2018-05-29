const router = require('express').Router();
const passport = require('passport');
const db = require('../models');
var path = require("path");

// auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
router.get('logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['email']
}));

// dashboard
router.get('/dashboard')

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
<<<<<<< HEAD
    console.log("uid:" + req.User.id)
    // res.redirect('/my-dreams')
=======
>>>>>>> parent of 6f63cbf... Figured out cookie manipulation so user id session persists throughout web app
    res.sendFile(path.join(__dirname, "../public/mydreams.html"));
});


module.exports = router;