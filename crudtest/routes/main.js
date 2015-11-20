var app = module.parent.exports.app;
var Persons = require('../models/persons.js');
var Admins = require('../models/admins.js');
var passport = module.parent.exports.passport;

app.get('/list', function(req, res){
  Persons.find({}, function(err, docs){
    res.render('list', { title: 'List', persons: docs});
  });
});

app.post('/list', function(req, res){
  res.end('It works!');
});

// Authentication
app.get('/login', function(req, res){
    res.render('login', {})
});

app.post('/login', passport.authenticate('AdminLogin', 
    { 
      successRedirect: '/list',
      failureRedirect: '/login'
    }
));



