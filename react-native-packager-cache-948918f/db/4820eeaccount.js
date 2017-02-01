'use strict';Object.defineProperty(exports,"__esModule",{value:true});


var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _reactNative=require('react-native');











var _firebase=require('firebase');var firebase=babelHelpers.interopRequireWildcard(_firebase);
var _button=require('./button');var _button2=babelHelpers.interopRequireDefault(_button);
var _header=require('./header');var _header2=babelHelpers.interopRequireDefault(_header);
var _login=require('./login');var _login2=babelHelpers.interopRequireDefault(_login);
var _common=require('../styles/common.js');var _common2=babelHelpers.interopRequireDefault(_common);
var _firebaseInit=require('../db/firebase-init');var _firebaseInit2=babelHelpers.interopRequireDefault(_firebaseInit);var


Account=function(_Component){babelHelpers.inherits(Account,_Component);

function Account(props){babelHelpers.classCallCheck(this,Account);var _this=babelHelpers.possibleConstructorReturn(this,(Account.__proto__||Object.getPrototypeOf(Account)).call(this,

props));
_this.state={
loaded:false};return _this;


}babelHelpers.createClass(Account,[{key:'componentWillMount',value:function componentWillMount()

{var _this2=this;

_reactNative.AsyncStorage.getItem('user_data').then(function(userData){
var ud=JSON.parse(userData);
_this2.setState({
user:ud,
loaded:true});

});

}},{key:'render',value:function render()

{

return(
_react2.default.createElement(_reactNative.View,{style:_common2.default.container},
_react2.default.createElement(_header2.default,{text:'Account',loaded:this.state.loaded}),
_react2.default.createElement(_reactNative.View,{style:_common2.default.body},

this.state.user&&
_react2.default.createElement(_reactNative.View,{style:_common2.default.body},
_react2.default.createElement(_reactNative.View,{style:page_styles.email_container},
_react2.default.createElement(_reactNative.Text,{style:page_styles.email_text},this.state.user.email)),

_react2.default.createElement(_reactNative.Image,{
style:_common2.default.image,
source:{uri:this.state.user.profileImageURL}}),

_react2.default.createElement(_button2.default,{
text:'Logout',
onpress:this.logout.bind(this),
button_styles:_common2.default.primary_button,
button_text_styles:_common2.default.primary_button_text})))));





}},{key:'logout',value:function logout()

{var _this3=this;

_reactNative.AsyncStorage.removeItem('user_data').then(function(){
firebase.auth().signOut().then(function(){
_this3.props.navigator.push({
component:_login2.default});

},function(err){
console.error(err.stack||err);
alert('Error: Could not log out.');
});

});

}}]);return Account;}(_react.Component);exports.default=Account;



var page_styles=_reactNative.StyleSheet.create({
email_container:{
padding:20},

email_text:{
fontSize:18}});




_reactNative.AppRegistry.registerComponent('account',function(){return Account;});