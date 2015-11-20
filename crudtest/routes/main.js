var app = module.parent.exports.app;
var Persons = require('../models/persons.js');
var Admins = require('../models/admins.js');
var passport = module.parent.exports.passport;


var adminAuth = function(req, res, next){
    console.log(req.user);
    //authorize role
    if(typeof req.user !== "undefined"){
        next();
    } else {
        //Not authorized redirect
        res.redirect('/login');
    }
}

app.get('/list', adminAuth, function(req, res){
  Persons.find({}, function(err, docs){
    res.render('list', { title: 'List', persons: docs});
  });
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.post('/list', adminAuth, function(req, res){
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



