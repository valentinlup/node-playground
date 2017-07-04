let postsList = require('../models/posts.json');
const PostService = {};

PostService.getAll = () => {
  return postsList;
};

PostService.getAllPublic = () => {
  return postsList.filter(post => {
    return post.public;
  });
};

PostService.updatePost = (id, isPublic) => {
  const postIndex = postsList.findIndex(post => {
    return post.id == id;
  });

  if(postIndex > -1) {
    postsList[postIndex].public = (isPublic == 'true');
  } else {
    throw new Error(`Post with id ${id} not found`);
  }
};

module.exports = PostService;
