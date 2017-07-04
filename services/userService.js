const usersList = require('../models/users.json');
const UserService = {};

UserService.findByUserAndPass = (username, password) => {
  const foundUser = usersList.find(user => {
    return user.username === username && user.password === password;
  });
  return foundUser;
};

UserService.findById = (id) => {
  const foundUser = usersList.find(user => {
    return user.id === id;
  });
  return foundUser;
};

module.exports = UserService;
