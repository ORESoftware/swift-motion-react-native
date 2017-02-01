

const Buffer = global.Buffer = require('buffer').Buffer;

var dgram = require('dgram')
// OR, if not shimming via package.json "browser" field:
// var dgram = require('react-native-udp')

var socket = dgram.createSocket('udp4');

socket.bind(12345, '0.0.0.0', function(err){
    (err && console.error(err.stack || err)) || console.log('bound');
});

socket.once('listening', function() {

  console.log('listening!!');
//  var buf = toByteArray('excellent!')
//  socket.send(buf, 0, buf.length, remotePort, remoteHost, function(err) {
//    if (err) throw err
//
//    console.log('message was sent')
//  })
})

socket.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
});

socket.on('message', function(msg, rinfo) {
   console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
});

setInterval(function(){

socket.send(Buffer.from('xyzm'), 0, 3, 12346,'10.0.0.24', function(err){
      err && console.error(err.stack || err);
   });

}, 2000);



export default socket;