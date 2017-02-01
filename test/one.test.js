


const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(12346, '10.0.0.24', function(err){
    (err && console.error(err.stack || err)) || console.log('bound');
});


setInterval(function(){

   server.send('abc', 0, 3, 12345,'0.0.0.0', function(err){
        err && console.error(err.stack || err);
   });

}, 3000);