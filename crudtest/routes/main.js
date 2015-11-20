var app = module.parent.exports.app;
var Persons = require('../models/persons.js');

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

app.post('/login', function(req, res){
  res.json(req.body);
});
