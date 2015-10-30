var app = module.parent.exports.app;

app.get('/list', function(req, res){
  res.end('It works!');
});

app.post('/list', function(req, res){
  res.end('It works!');
});
