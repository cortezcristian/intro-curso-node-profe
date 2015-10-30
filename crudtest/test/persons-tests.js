var Person = require('../models/persons');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/crudtest');

var p = new Person({ name:"Cristian", age:27 });

p.save(function(err, doc){
    console.log(err, doc);    
});

Person.find({age:27}, function(err, docs){
    console.log(err, docs);    
});
