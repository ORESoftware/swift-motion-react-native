

'use strict';

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _reactNative=require('react-native');









var _handleUdp=require('./shared/comm/handle-udp');var _handleUdp2=babelHelpers.interopRequireDefault(_handleUdp);
var _firebase=require('firebase');var firebase=babelHelpers.interopRequireWildcard(_firebase);
var _signup=require('./shared/components/signup');var _signup2=babelHelpers.interopRequireDefault(_signup);
var _account=require('./shared/components/account');var _account2=babelHelpers.interopRequireDefault(_account);
var _header=require('./shared/components/header');var _header2=babelHelpers.interopRequireDefault(_header);
var _firebaseInit=require('./shared/db/firebase-init');var _firebaseInit2=babelHelpers.interopRequireDefault(_firebaseInit);
var _common=require('./shared/styles/common.js');var _common2=babelHelpers.interopRequireDefault(_common);var

AwesomeProject=function(_Component){babelHelpers.inherits(AwesomeProject,_Component);

function AwesomeProject(props){babelHelpers.classCallCheck(this,AwesomeProject);var _this=babelHelpers.possibleConstructorReturn(this,(AwesomeProject.__proto__||Object.getPrototypeOf(AwesomeProject)).call(this,
props));
_this.state={
component:null,
loaded:false};return _this;

}babelHelpers.createClass(AwesomeProject,[{key:'componentWillMount',value:function componentWillMount()

{var _this2=this;

_reactNative.AsyncStorage.getItem('user_data').
then(JSON.parse).
then(function(userData){

var component={component:_signup2.default};

if(userData==null){
_this2.setState(component);
return;
}



_this2.setState({component:_account2.default});












});

}},{key:'render',value:function render()

{

if(this.state.component){
return(
_react2.default.createElement(_reactNative.Navigator,{
initialRoute:{component:this.state.component},
configureScene:function configureScene(){
return _reactNative.Navigator.SceneConfigs.FloatFromRight;
},
renderScene:function renderScene(route,navigator){
if(route.component){
return _react2.default.createElement(route.component,{navigator:navigator});
}
}}));


}else{
return(
_react2.default.createElement(_reactNative.View,{style:_common2.default.container},
_react2.default.createElement(_header2.default,{text:'React Native Firebase Auth',loaded:this.state.loaded}),
_react2.default.createElement(_reactNative.View,{style:_common2.default.body})));


}

}}]);return AwesomeProject;}(_react.Component);




_reactNative.AppRegistry.registerComponent('AwesomeProject',function(){return AwesomeProject;});