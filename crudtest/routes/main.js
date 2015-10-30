var app = module.parent.exports.app;
var Persons = require('../models/persons.js');

app.get('/list', function(req, res){
  Persons.find({}, function(err, docs){
    res.json(docs);
  });
});

app.post('/list', function(req, res){
  res.end('It works!');
});
