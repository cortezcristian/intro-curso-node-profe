var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    name : String,
    age  : Number
});

var personModel = mongoose.model('Persons', personSchema);

module.exports = personModel;
