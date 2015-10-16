// Product Model
// -----------------------------

// Modules Dependencies:
//  - Mongoose (http://mongoosejs.com/docs/guide.html)
//  
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var productSchema = new Schema({
    name          : String, 
	created       : Date         
});

// ### Hooks 
// #### Pre-Save
productSchema.pre("save", function(next) {
    if(!this.created)
        this.created = new Date();
    next();
});

// ### Method:
productSchema.method("instanceMethod", function(param, cb) {
    var product = this;
    this.save(cb);
});

// ### Static:
productSchema.statics.customMethod = function (paramid, cb) {
  var Product = this;
  Product.findOne({ _id: paramid}, function(err, product){
      cb(err, product);
  });
}

// Export module
module.exports = mongoose.model('Product', productSchema);
