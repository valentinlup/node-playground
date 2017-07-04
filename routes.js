const express = require('express');
const router = express.Router();
const passport = require('passport');
const Controller = require('./controllers/controller');

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next();
  } else {
    next(new Error('User not authorized'));
  };
};

router.get('/', Controller.getPublicPage);

router.get('/login', Controller.getLoginPage);

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login'}),
  Controller.doLogin
);

router.get('/private', isLoggedIn, Controller.getPrivatePage);

router.get('/logout', isLoggedIn, Controller.doLogout);

router.post('/updatePost', isLoggedIn, Controller.updatePost);

module.exports = router;
