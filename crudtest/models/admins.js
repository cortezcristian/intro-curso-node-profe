var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var adminSchema = new Schema({
    email    : String,
    password : String
});

/*
var ad = new Admin({password: '123456'});
ad.save();

*/
adminSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = crypto.createHash('md5').update(this.password).digest("hex");
    }
    next();
});

adminSchema.method('authenticate', function(pwd) {
    return crypto.createHash('md5').update(pwd).digest("hex") === this.password;
});


var adminModel = mongoose.model('Admins', adminSchema);

module.exports = adminModel;
