var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var fixtures = require('mongoose-fixtures');
var passport = require('passport');
exports.passport = passport;

var routes = require('./routes/index');
var users = require('./routes/user');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/crudtest');

fixtures.load('./fixtures/admins.js');

var app = express();
exports.app = app;


// Extra manejo de Excepciones Global
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'supersecret', saveUninitialized: true, resave: true}));
app.use(passport.initialize());
app.use(passport.session());

require('./auth/local-strategy.js');

app.use('/', routes);
app.use('/users', users);
require('./routes/main.js');

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});


module.exports = app;
