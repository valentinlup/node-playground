const express = require('express');
const helmet = require('helmet');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const PassportHelper = require('./helpers/passportHelper');
const app = express();

const routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(helmet({
  noCache: true
}));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  store: new FileStore,
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({}, PassportHelper.strategy));

passport.serializeUser(PassportHelper.serializeUser);

passport.deserializeUser(PassportHelper.deserializeUser);

app.use('/', routes);

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});
