const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const env = require('dotenv').config().parsed;

const memberRoute = require('./routes/main_route');
const chatRoute = require('./routes/chat_route');
const directoryRoute = require('./routes/directory_route');
const moreRoute = require('./routes/more_route');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/admin', express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/api/' + env.API_VERSION, [memberRoute, chatRoute, directoryRoute, moreRoute]);

const buildPath = '../frontend/build';
app.use(express.static(buildPath));
app.get('*', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, buildPath, 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
