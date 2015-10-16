// Products REST API
// -----------------------------

// Modules Dependencies:
//  - Assert (http://nodejs.org/api/assert.html)
//  - SuperAgent (http://visionmedia.github.io/superagent/)
var assert = require('assert'),
    config = require('../../../config'),
    superagent = require('superagent');

// Require basic config files and DB connection
require('../../../utils/dbconnect');

// Global Variables for the test case
var Product, product, agent, productId, d;
d = 'http://'+config.app.domain+":"+config.app.port;

// Unit Tests
describe('REST API Product '+d+"/api/v1/products", function(){
    before(function(done){
        // Before all tests
        Product = require("../../../models/product.js");
        // It show create a new document in the database
        product = new Product({ name: 'product'+Math.floor((Math.random() * 10) + 1)});
        product.save(function(err, doc){
            productId = doc._id;    
        });
        // Get domain
        d = config.app.domain+":"+config.app.port;
        // Start agent
        agent = superagent.agent();
        // Login if necesary
        agent
          .post(d+'/admin')
          .send({ email: "admin@anyandgo.com", password: "123456" })
          .end(function(res) {
              assert.ok(res.ok);
              done();
          });
    });

    describe('Products REST', function(){
        it('GET /api/v1/products', function(done){
            agent
              .get(d+'/api/v1/products')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.length>0);
                  done();
              });
        });
        it('GET /api/v1/products/count', function(done){
            agent
              .get(d+'/api/v1/products/count')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.count > 0);
                  done();
              });
        });
        it('POST /api/v1/products', function(done){
            agent
              .post(d+'/api/v1/products')
              .send({ name: 'Test Creation Product' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Creation Product');
                  done();
              });
        });
        it('PUT /api/v1/products/:productId', function(done){
            agent
              .put(d+'/api/v1/products/'+productId)
              .send({ name: 'Test Change Product' })
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(res.body.name === 'Test Change Product');
                  done();
              });
        });
        it('DELETE /api/v1/products/:productId', function(done){
            agent
              .del(d+'/api/v1/products/'+productId)
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });
        it('DELETE /api/v1/products', function(done){
            agent
              .del(d+'/api/v1/products/')
              .end(function(res) {
                  assert.ok(res.ok);
                  assert.ok(JSON.stringify(res.body) === '{}');
                  done();
              });
        });

    });
});
