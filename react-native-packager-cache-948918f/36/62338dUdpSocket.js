











'use strict';

var inherits=require('inherits');
var EventEmitter=require('events').EventEmitter;var _require=



require('react-native'),DeviceEventEmitter=_require.DeviceEventEmitter,NativeModules=_require.NativeModules;
var Sockets=NativeModules.UdpSockets;
var base64=require('base64-js');
var ipRegex=require('ip-regex');

var hostnameRegex=/^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$/;
var noop=function noop(){};
var instances=0;
var STATE={
UNBOUND:0,
BINDING:1,
BOUND:2};


module.exports=UdpSocket;

function UdpSocket(options,onmessage){
EventEmitter.call(this);

if(typeof options==='string')options={type:options};

if(options.type!=='udp4'&&options.type!=='udp6'){
throw new Error('invalid udp socket type');
}

this.type=options.type;
this._ipv=Number(this.type.slice(3));
this._ipRegex=ipRegex['v'+this._ipv]({exact:true});
this._id=instances++;
this._state=STATE.UNBOUND;
this._subscription=DeviceEventEmitter.addListener(
'udp-'+this._id+'-data',this._onReceive.bind(this));



if(!this.on)this.on=this.addListener.bind(this);

if(onmessage)this.on('message',onmessage);

Sockets.createSocket(this._id,{
type:this.type});

}

inherits(UdpSocket,EventEmitter);

UdpSocket.prototype._debug=function(){
if(__DEV__){
var args=[].slice.call(arguments);
args.unshift('socket-'+this._id);
console.log.apply(console,args);
}
};

UdpSocket.prototype.bind=function(port,address,callback){
var self=this;

if(this._state!==STATE.UNBOUND)throw new Error('Socket is already bound');

if(typeof address==='function'){
callback=address;
address=undefined;
}

if(!address)address='0.0.0.0';

if(!port)port=0;

if(callback)this.once('listening',callback.bind(this));

this._state=STATE.BINDING;
this._debug('binding, address:',address,'port:',port);
Sockets.bind(this._id,port,address,function(err,addr){
err=normalizeError(err);
if(err){


self._state=STATE.UNBOUND;
self._debug('failed to bind',err);
if(callback)callback(err);
return self.emit('error',err);
}

self._debug('bound to address:',addr.address,'port:',addr.port);
self._address=addr.address;
self._port=addr.port;
self._state=STATE.BOUND;
self.emit('listening');
});
};

UdpSocket.prototype.close=function(){
if(this._destroyed)return;

this._destroyed=true;
this._debug('closing');
this._subscription.remove();

Sockets.close(this._id,this._debug.bind(this,'closed'));
this.emit('close');
};

UdpSocket.prototype._onReceive=function(info){

var buf=typeof Buffer==='undefined'?
base64.toByteArray(info.data):
new Buffer(info.data,'base64');

var rinfo={
address:info.address,
port:info.port,
family:'IPv4',
size:buf.length};


this.emit('message',buf,rinfo);
};
























UdpSocket.prototype.send=function(buffer,offset,length,port,address,callback){
var self=this;

if(typeof port!=='number')throw new Error('invalid port');
if(!isValidIpOrHostname(address,this._ipRegex))throw new Error('invalid address');

if(offset!==0)throw new Error('Non-zero offset not supported yet');

if(this._state===STATE.UNBOUND){
var args=[].slice.call(arguments);
return this.bind(0,function(err){
if(err)return callback(err);

self.send.apply(self,args);
});
}else
if(this._state===STATE.BINDING){

}

callback=callback||noop;
var str;
if(typeof buffer==='string'){
console.warn('socket.send(): interpreting as base64');
str=buffer;
}else
if(typeof Buffer!=='undefined'&&Buffer.isBuffer(buffer)){
str=buffer.toString('base64');
}else
if(buffer instanceof Uint8Array||Array.isArray(buffer)){
str=base64.fromByteArray(buffer);
}else
{
throw new Error('invalid message format');
}

Sockets.send(this._id,str,+port,address,function(err){
err=normalizeError(err);
if(err){
self._debug('send failed',err);
return callback(err);
}

callback();
});
};

UdpSocket.prototype.address=function(){
if(this._state!==STATE.BOUND){
throw new Error('socket is not bound yet');
}

return{
address:this._address,
port:this._port,
family:'IPv4'};

};

UdpSocket.prototype.setBroadcast=function(flag){
var self=this;

if(this._state!==STATE.BOUND){
throw new Error('you must bind before setBroadcast()');
}

Sockets.setBroadcast(this._id,flag,function(err){
err=normalizeError(err);
if(err){
self._debug('failed to set broadcast',err);
return self.emit('error',err);
}
});
};

UdpSocket.prototype.setTTL=function(ttl){

};

UdpSocket.prototype.setMulticastTTL=function(ttl,callback){

};

UdpSocket.prototype.setMulticastLoopback=function(flag,callback){

};

UdpSocket.prototype.addMembership=function(multicastAddress){
if(this._state!==STATE.BOUND){
throw new Error('you must bind before addMembership()');
}

Sockets.addMembership(this._id,multicastAddress);
};

UdpSocket.prototype.dropMembership=function(multicastAddress){
if(this._state!==STATE.BOUND){
throw new Error('you must bind before addMembership()');
}

Sockets.dropMembership(this._id,multicastAddress);
};

UdpSocket.prototype.ref=function(){

};

UdpSocket.prototype.unref=function(){

};

function isValidIpOrHostname(address,ipRegex){
if(typeof address!=='string')return false;

return ipRegex.test(address)||hostnameRegex.test(address);
}

function normalizeError(err){
if(err){
if(typeof err==='string')err=new Error(err);

return err;
}
}