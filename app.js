var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./src/routes/index');
var apiIndexRouter = require('./src/routes/api_index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'src/assets')));

app.use('/', indexRouter);
app.use('/api', apiIndexRouter);

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


//connect to server

async function connect() {
  try {
     await mongoose.connect('mongodb+srv://myCoffeeDB:abc%40123@piccolocoffeecluster.dvdub.mongodb.net/intern?retryWrites=true&w=majority', {});
     console.log('connect success');
  } catch (error) {
     console.log("connect fail");
  }
}
connect()

module.exports = app;
