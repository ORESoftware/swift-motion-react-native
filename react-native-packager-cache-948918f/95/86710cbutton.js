

'use strict';Object.defineProperty(exports,"__esModule",{value:true});

var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);

var _reactNative=require('react-native');var







Button=function(_Component){babelHelpers.inherits(Button,_Component);function Button(){babelHelpers.classCallCheck(this,Button);return babelHelpers.possibleConstructorReturn(this,(Button.__proto__||Object.getPrototypeOf(Button)).apply(this,arguments));}babelHelpers.createClass(Button,[{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.TouchableHighlight,{underlayColor:'#E8E8E8',onPress:this.props.onpress,style:this.props.button_styles},
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNative.Text,{style:this.props.button_text_styles},this.props.text)))));




}}]);return Button;}(_react.Component);exports.default=Button;


_reactNative.AppRegistry.registerComponent('button',function(){return Button;});