Object.defineProperty(exports,"__esModule",{value:true});var _react=require('react');var _react2=babelHelpers.interopRequireDefault(_react);
var _reactNative=require('react-native');var

GiftedSpinner=function(_Component){babelHelpers.inherits(GiftedSpinner,_Component);function GiftedSpinner(){babelHelpers.classCallCheck(this,GiftedSpinner);return babelHelpers.possibleConstructorReturn(this,(GiftedSpinner.__proto__||Object.getPrototypeOf(GiftedSpinner)).apply(this,arguments));}babelHelpers.createClass(GiftedSpinner,[{key:'render',value:function render()
{
return(
_react2.default.createElement(_reactNative.ActivityIndicator,babelHelpers.extends({
animating:true,
size:'small'},
this.props)));


}}]);return GiftedSpinner;}(_react.Component);exports.default=GiftedSpinner;