const express = require('express');
const router = express.Router();
const passport = require('passport');

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    next(new Error('User not authorized'));
  };
};

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/login',
passport.authenticate('local', { failureRedirect: '/login'}),
(req, res) => {
  req.session.save(function () {
    res.redirect('/private');
  });
});

router.get('/private', isLoggedIn,
function (req, res) {
  res.render('private_welcome');
});

router.get('/logout', isLoggedIn,
function (req, res) {
  res.redirect('/');
});

module.exports = router;
