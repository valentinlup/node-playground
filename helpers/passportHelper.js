const UserService = require('../services/userService');
const PassportHelper = {};

PassportHelper.findUser = (username, password, callback) => {
  const foundUser = UserService.findByUserAndPass(username, password);
  return callback(null, foundUser);
};

PassportHelper.serializeUser = (user, done) => {
  done(null, user.id);
};

PassportHelper.deserializeUser = (id, done) => {
  const foundUser = UserService.findById(id);
  if(foundUser) {
    done(null, foundUser);
  } else {
    done(new Error(`User with ID: ${id} doesn't exist`));
  }
};

PassportHelper.strategy = (username, password, done) => {
  PassportHelper.findUser(username, password, (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
    return done(null, user);
  })
}

module.exports = PassportHelper;
