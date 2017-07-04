const PostService = require('../services/postService');
const Controller = {};

Controller.getPublicPage = (req, res) => {
  const posts = PostService.getAllPublic();
  res.render('welcome', {posts});
};

Controller.getLoginPage = (req, res) => {
  res.render('login');
};

Controller.doLogin = (req, res) => {
  res.redirect('/private');
}

Controller.getPrivatePage = (req, res) => {
  const posts = PostService.getAll();
  res.render('private_welcome', {posts});
}

Controller.doLogout = (req, res) => {
  res.redirect('/');
}

Controller.updatePost = (req, res) => {
  try {
    PostService.updatePost(req.body.id, req.body.public);
    res.json({});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}

module.exports = Controller;
