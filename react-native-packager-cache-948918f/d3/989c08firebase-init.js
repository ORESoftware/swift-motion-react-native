Object.defineProperty(exports,"__esModule",{value:true});

var _firebase=require('firebase');var firebase=babelHelpers.interopRequireWildcard(_firebase);

var firebaseConfig={
apiKey:'AIzaSyD8hwcmgR1hdGgMp-uibr3dxUp-O6SZJSY',
authDomain:'swiftmotion-c90b2.firebaseapp.com',
databaseURL:'https://swiftmotion-c90b2.firebaseio.com',
storageBucket:'swiftmotion-c90b2.appspot.com',
messagingSenderId:'224050457490'};



firebase.initializeApp(firebaseConfig);

var rootRef=firebase.database().ref();exports.default=

rootRef;