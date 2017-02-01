'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _reactNative=require('react-native');










var _firebase=require('firebase');var firebase=babelHelpers.interopRequireWildcard(_firebase);
var _button=require('./button');var _button2=babelHelpers.interopRequireDefault(_button);
var _header=require('./header');var _header2=babelHelpers.interopRequireDefault(_header);
var _login=require('./login');var _login2=babelHelpers.interopRequireDefault(_login);
var _account=require('./account');var _account2=babelHelpers.interopRequireDefault(_account);
var _firebaseInit=require('../db/firebase-init');var _firebaseInit2=babelHelpers.interopRequireDefault(_firebaseInit);
var _common=require('../styles/common.js');var _common2=babelHelpers.interopRequireDefault(_common);var


signup=function(_Component){babelHelpers.inherits(signup,_Component);

function signup(props){babelHelpers.classCallCheck(this,signup);var _this=babelHelpers.possibleConstructorReturn(this,(signup.__proto__||Object.getPrototypeOf(signup)).call(this,

props));

_this.state={
loaded:true,
email:'',
password:''};return _this;

}babelHelpers.createClass(signup,[{key:'signup',value:function signup()

{var _this2=this;

this.setState({
loaded:false});



firebase.auth().
createUserWithEmailAndPassword(this.state.email,this.state.password).
then(function(userData){

console.log('user data => ',userData);

_this2.setState({
email:'',
password:'',
loaded:true});


alert('Your account was created! => '+JSON.stringify(userData));

_reactNative.AsyncStorage.setItem('user_data',JSON.stringify(userData)).
then(function(){
_this2.props.navigator.push({
component:_account2.default});

},
function(err){
alert('Error: Could not save to async storage.');
});


},function(error){

alert(error);
alert(error.code);

switch(error.code){


case'auth/email-already-in-use':
alert('Email address already in use.');
break;

case'INVALID_EMAIL':
alert('The specified email is not a valid email.');
break;

default:
alert('Error creating user:');}


});

}},{key:'goToLogin',value:function goToLogin()

{
this.props.navigator.push({
component:_login2.default});

}},{key:'render',value:function render()

{var _this3=this;
return(
_react2.default.createElement(_reactNative.View,{style:_common2.default.container},

_react2.default.createElement(_header2.default,{text:'Signup',loaded:this.state.loaded}),

_react2.default.createElement(_reactNative.View,{style:_common2.default.body},

_react2.default.createElement(_reactNative.TextInput,{
style:_common2.default.textinput,
onChangeText:function onChangeText(text){return _this3.setState({email:text});},
value:this.state.email,
placeholder:'Email Address'}),


_react2.default.createElement(_reactNative.TextInput,{
style:_common2.default.textinput,
onChangeText:function onChangeText(text){return _this3.setState({password:text});},
value:this.state.password,
secureTextEntry:true,
placeholder:'Password'}),


_react2.default.createElement(_button2.default,{
text:'Signup',
onpress:this.signup.bind(this),
button_styles:_common2.default.primary_button,
button_text_styles:_common2.default.primary_button_text}),


_react2.default.createElement(_button2.default,{
text:'Got an Account?',
onpress:this.goToLogin.bind(this),
button_styles:_common2.default.transparent_button,
button_text_styles:_common2.default.transparent_button_text}))));





}}]);return signup;}(_react.Component);exports.default=signup;


_reactNative.AppRegistry.registerComponent('signup',function(){return signup;});