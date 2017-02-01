

'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _reactNative=require('react-native');









var _reactNativeGiftedSpinner=require('react-native-gifted-spinner');var _reactNativeGiftedSpinner2=babelHelpers.interopRequireDefault(_reactNativeGiftedSpinner);


var styles=_reactNative.StyleSheet.create({
header:{
padding:10,
flexDirection:'row',
alignItems:'center',
marginBottom:20,
flex:1},

header_item:{
paddingLeft:10,
paddingRight:10},

header_text:{
color:'#000',
fontSize:18}});var





Header=function(_Component){babelHelpers.inherits(Header,_Component);function Header(){babelHelpers.classCallCheck(this,Header);return babelHelpers.possibleConstructorReturn(this,(Header.__proto__||Object.getPrototypeOf(Header)).apply(this,arguments));}babelHelpers.createClass(Header,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNative.View,{style:styles.header},
_react2.default.createElement(_reactNative.View,{style:styles.header_item},
_react2.default.createElement(_reactNative.Text,{style:styles.header_text},this.props.text)),

_react2.default.createElement(_reactNative.View,{style:styles.header_item},
!this.props.loaded&&
_react2.default.createElement(_reactNativeGiftedSpinner2.default,null))));




}}]);return Header;}(_react.Component);exports.default=Header;






_reactNative.AppRegistry.registerComponent('header',function(){return Header;});