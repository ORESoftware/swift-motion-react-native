

const Buffer = global.Buffer = require('buffer');

var dgram = require('dgram')
// OR, if not shimming via package.json "browser" field:
// var dgram = require('react-native-udp')

var socket = dgram.createSocket('udp4');

socket.bind(12345);

socket.once('listening', function() {

  console.log('listening');
//  var buf = toByteArray('excellent!')
//  socket.send(buf, 0, buf.length, remotePort, remoteHost, function(err) {
//    if (err) throw err
//
//    console.log('message was sent')
//  })
})

socket.on('message', function(msg, rinfo) {
  console.log('message was received', msg)
});


export default socket;