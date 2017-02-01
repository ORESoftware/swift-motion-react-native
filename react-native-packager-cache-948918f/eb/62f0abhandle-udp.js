Object.defineProperty(exports,"__esModule",{value:true});

var Buffer=global.Buffer=require('buffer');

var dgram=require('dgram');



var socket=dgram.createSocket('udp4');

socket.bind(12345);

socket.once('listening',function(){

console.log('listening');






});

socket.on('message',function(msg,rinfo){
console.log('message was received',msg);
});exports.default=


socket;