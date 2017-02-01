if(typeof Object.create==='function'){

module.exports=function inherits(ctor,superCtor){
ctor.super_=superCtor;
ctor.prototype=Object.create(superCtor.prototype,{
constructor:{
value:ctor,
enumerable:false,
writable:true,
configurable:true}});


};
}else{

module.exports=function inherits(ctor,superCtor){
ctor.super_=superCtor;
var TempCtor=function TempCtor(){};
TempCtor.prototype=superCtor.prototype;
ctor.prototype=new TempCtor();
ctor.prototype.constructor=ctor;
};
}