var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let contactsRouter = require('./routes/contacts');
let menusRouter = require('./routes/menus');
let reservationsRouter = require('./routes/reservations');
let servicesRouter = require('./routes/services');
let adminLoginRouter = require('./routes/admin/adminLogin');
let adminMainRouter = require('./routes/admin/adminMain');
let adminContactsRouter = require('./routes/admin/adminContacts');
let adminEmailsRouter = require('./routes/admin/adminEmails');
let adminMenusRouter = require('./routes/admin/adminMenus');
let adminReservationsRouter = require('./routes/admin/adminReservations');
let adminUsersRouter = require('./routes/admin/adminUsers');
let session = require('express-session');
let RedisStore = require('connect-redis')(session);
let formidable = require('formidable');

var app = express();

// app.use(function (req, res, next) {

//   if (req.method.toLowerCase() === 'post') {

//     let form = formidable.IncomingForm({
//       uploadDir: path.join(__dirname, '/public/images'),
//       keepExtensions: true
//     });

//     form.parse(req, function (error, fields, files) {

//       req.fields = fields;
//       req.files = files;

//       next();

//     });

//   } else {

//     next();

//   }

// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  store: new RedisStore({
    host: 'localhost',
    port: 6379
  }),
  secret: 'daP@ssw0rd1sSo34sy',
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts', contactsRouter);
app.use('/menus', menusRouter);
app.use('/reservations', reservationsRouter);
app.use('/services', servicesRouter);
app.use('/admin', adminLoginRouter);
app.use('/admin/main', adminMainRouter);
app.use('/admin/contacts', adminContactsRouter);
app.use('/admin/emails', adminEmailsRouter);
app.use('/admin/menus', adminMenusRouter);
app.use('/admin/reservations', adminReservationsRouter);
app.use('/admin/users', adminUsersRouter);

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
