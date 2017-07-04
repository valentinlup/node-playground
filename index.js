const express = require('express');
const helmet = require('helmet');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const app = express();

const routes = require('./routes');

const users = [
  {
    id: 1,
    name: 'Vali',
    username: 'vali',
    password: 'vali'
  },
  {
    id: 2,
    name: 'John Doe',
    username: 'john',
    password: 'doe'
  }
];

const findUser = (username, password, callback) => {
  const foundUser = users.find(user => {
    return user.username === username && user.password === password;
  });
  return callback(null, foundUser);
};

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(helmet({
  noCache: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  store: new FileStore,
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({},
  function(username, password, done) {
    findUser(username, password, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
      return done(null, user);
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  const foundUser = users.find(user => {
    return user.id == id;
  });
  if(foundUser) {
    done(null, foundUser);
  } else {
    done(new Error(`User with ID: ${id} doesn't exist`));
  }
});

app.use('/', routes);

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
