var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
const fs = require('fs');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


const ENV = process.env.NODE_ENV;

const fileFileName = path.join(__dirname, './', './', 'logs', 'access.log')
const writeStream = fs.createWriteStream(fileFileName, { flags: 'a' })

if (ENV !== 'production') {
  app.use(logger('dev', {
    stream: writeStream
  }))
} else {
  app.use(logger('combined', {
    stream: writeStream
  }))
}
const { redisClient } = require("./db/redis");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionStore = new RedisStore({ client: redisClient });

app.use(session({
  secret: 'WJiol#23123',
  cookie: {
    // path: '/',默认为根目录
    // httpOnly: true, 默认为true
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  store: sessionStore,
}));

app.use('/api/user', usersRouter);
app.use('/api/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
