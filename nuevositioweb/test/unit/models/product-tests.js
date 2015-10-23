// Product Test Cases
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
var assert = require('assert');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Product, product;

// Unit Tests
describe('Model Test Product', function(){
    before(function(){
        // Before all tests
        Product = require("../../../models/product.js");
    });

    describe('Product', function(){
        // It show create a new document in the database
        it('add a product', function(done){
            product = new Product({ name: 'product'+Math.floor((Math.random() * 10) + 1)});
            product.save(done);
        });

    });
});
