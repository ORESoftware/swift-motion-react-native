
'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _reactNative=require('react-native');









var _firebase=require('firebase');var firebase=babelHelpers.interopRequireWildcard(_firebase);
var _button=require('./button');var _button2=babelHelpers.interopRequireDefault(_button);
var _header=require('./header');var _header2=babelHelpers.interopRequireDefault(_header);
var _signup=require('./signup');var _signup2=babelHelpers.interopRequireDefault(_signup);
var _account=require('./account');var _account2=babelHelpers.interopRequireDefault(_account);
var _firebaseInit=require('../db/firebase-init');var _firebaseInit2=babelHelpers.interopRequireDefault(_firebaseInit);
var _common=require('../styles/common.js');var _common2=babelHelpers.interopRequireDefault(_common);var


Login=function(_Component){babelHelpers.inherits(Login,_Component);

function Login(props){babelHelpers.classCallCheck(this,Login);var _this=babelHelpers.possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this,
props));

_this.state={
email:'',
password:'',
loaded:true};return _this;

}babelHelpers.createClass(Login,[{key:'render',value:function render()

{var _this2=this;
return(
_react2.default.createElement(_reactNative.View,{style:_common2.default.container},

_react2.default.createElement(_header2.default,{text:'Login',loaded:this.state.loaded}),

_react2.default.createElement(_reactNative.View,{style:_common2.default.body},

_react2.default.createElement(_reactNative.TextInput,{
style:_common2.default.textinput,
onChangeText:function onChangeText(text){return _this2.setState({email:text});},
value:this.state.email,
placeholder:'Email Address'}),


_react2.default.createElement(_reactNative.TextInput,{
style:_common2.default.textinput,
onChangeText:function onChangeText(text){return _this2.setState({password:text});},
value:this.state.password,
secureTextEntry:true,
placeholder:'Password'}),


_react2.default.createElement(_button2.default,{
text:'Login',
onpress:this.login.bind(this),
button_styles:_common2.default.primary_button,
button_text_styles:_common2.default.primary_button_text}),

_react2.default.createElement(_button2.default,{
text:'New here?',
onpress:this.goToSignup.bind(this),
button_styles:_common2.default.transparent_button,
button_text_styles:_common2.default.transparent_button_text}))));





}},{key:'login',value:function login()

{var _this3=this;

this.setState({
loaded:false});


firebase.auth().
signInWithEmailAndPassword(this.state.email,this.state.password).
then(function(userData){

_this3.setState({
loaded:true});


_reactNative.AsyncStorage.setItem('user_data',JSON.stringify(userData)).
then(function(){
_this3.props.navigator.push({
component:_account2.default});

},
function(err){
alert('Error: Could not save to async storage.');
});


},function(error){
console.error(error.stack||error);
alert('Login Failed. Please try again');
});


}},{key:'goToSignup',value:function goToSignup()

{
this.props.navigator.push({
component:_signup2.default});

}}]);return Login;}(_react.Component);exports.default=Login;



_reactNative.AppRegistry.registerComponent('login',function(){return Login;});