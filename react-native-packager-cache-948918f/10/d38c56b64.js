var lookup='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function(exports){
'use strict';

var Arr=typeof Uint8Array!=='undefined'?
Uint8Array:
Array;

var PLUS='+'.charCodeAt(0);
var SLASH='/'.charCodeAt(0);
var NUMBER='0'.charCodeAt(0);
var LOWER='a'.charCodeAt(0);
var UPPER='A'.charCodeAt(0);
var PLUS_URL_SAFE='-'.charCodeAt(0);
var SLASH_URL_SAFE='_'.charCodeAt(0);

function decode(elt){
var code=elt.charCodeAt(0);
if(code===PLUS||
code===PLUS_URL_SAFE)
return 62;
if(code===SLASH||
code===SLASH_URL_SAFE)
return 63;
if(code<NUMBER)
return-1;
if(code<NUMBER+10)
return code-NUMBER+26+26;
if(code<UPPER+26)
return code-UPPER;
if(code<LOWER+26)
return code-LOWER+26;
}

function b64ToByteArray(b64){
var i,j,l,tmp,placeHolders,arr;

if(b64.length%4>0){
throw new Error('Invalid string. Length must be a multiple of 4');
}






var len=b64.length;
placeHolders='='===b64.charAt(len-2)?2:'='===b64.charAt(len-1)?1:0;


arr=new Arr(b64.length*3/4-placeHolders);


l=placeHolders>0?b64.length-4:b64.length;

var L=0;

function push(v){
arr[L++]=v;
}

for(i=0,j=0;i<l;i+=4,j+=3){
tmp=decode(b64.charAt(i))<<18|decode(b64.charAt(i+1))<<12|decode(b64.charAt(i+2))<<6|decode(b64.charAt(i+3));
push((tmp&0xFF0000)>>16);
push((tmp&0xFF00)>>8);
push(tmp&0xFF);
}

if(placeHolders===2){
tmp=decode(b64.charAt(i))<<2|decode(b64.charAt(i+1))>>4;
push(tmp&0xFF);
}else if(placeHolders===1){
tmp=decode(b64.charAt(i))<<10|decode(b64.charAt(i+1))<<4|decode(b64.charAt(i+2))>>2;
push(tmp>>8&0xFF);
push(tmp&0xFF);
}

return arr;
}

function uint8ToBase64(uint8){
var i,
extraBytes=uint8.length%3,
output="",
temp,length;

function encode(num){
return lookup.charAt(num);
}

function tripletToBase64(num){
return encode(num>>18&0x3F)+encode(num>>12&0x3F)+encode(num>>6&0x3F)+encode(num&0x3F);
}


for(i=0,length=uint8.length-extraBytes;i<length;i+=3){
temp=(uint8[i]<<16)+(uint8[i+1]<<8)+uint8[i+2];
output+=tripletToBase64(temp);
}


switch(extraBytes){
case 1:
temp=uint8[uint8.length-1];
output+=encode(temp>>2);
output+=encode(temp<<4&0x3F);
output+='==';
break;
case 2:
temp=(uint8[uint8.length-2]<<8)+uint8[uint8.length-1];
output+=encode(temp>>10);
output+=encode(temp>>4&0x3F);
output+=encode(temp<<2&0x3F);
output+='=';
break;}


return output;
}

exports.toByteArray=b64ToByteArray;
exports.fromByteArray=uint8ToBase64;
})(typeof exports==='undefined'?this.base64js={}:exports);