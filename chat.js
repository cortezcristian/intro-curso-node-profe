var net = require('net');
var sockets = [];

var server = net.createServer(function(s){
    // Definir que hago con cada socket s    
    sockets.push(s);
    s.write("Bienvenido al chat");

    s.on('data', function(d){
        sockets.forEach(function(v,i){
          if(v!==s){
            v.write(d);
          }
        });
    });

    s.on("end", function(){
      var index = sockets.indexof(s);
      delete sockets[index];
    });
});

server.listen(1337, '192.168.1.71');

