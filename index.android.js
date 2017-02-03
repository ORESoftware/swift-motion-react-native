

'use strict';

import React, {Component} from 'react';

import {
  AppRegistry,
  Text,
  View,
  Navigator,
  AsyncStorage
}
from 'react-native';

import * as firebase from 'firebase';
import Signup from './shared/components/signup';
import Account from './shared/components/account';
import Header from './shared/components/header';
import app from './shared/db/firebase-init'
import styles from './shared/styles/common.js';

class AwesomeProject extends Component {

  constructor(props){
    super(props);
    this.state = {
      component: null,
      loaded: false
    };
  }

  componentWillMount(){

    AsyncStorage.getItem('user_data')
    .then(JSON.parse)
    .then((userData) => {

      let component = {component: Signup};

      if(userData == null){
         this.setState(component);
         return;
      }

       // alert(user_data_json);
       // alert(firebase.User + JSON.stringify(firebase.User));
       this.setState({component: Account});

//      firebase.auth().signInWithCustomToken(user_data.accessToken)
//      .then(() => {
//
//       this.setState({component: Account});
//
//      }, error => {
//
//        console.error(error.stack || error);
//        this.setState(component);
//      });

    });

  }

  render(){

    if(this.state.component){
      return (
        <Navigator
          initialRoute={{component: this.state.component}}
          configureScene={() => {
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          renderScene={(route, navigator) => {
            if(route.component){
              return React.createElement(route.component, { navigator });
            }
          }}
        />
      );
    }else{
      return (
        <View style={styles.container}>
          <Header text="React Native Firebase Auth" loaded={this.state.loaded} />
          <View style={styles.body}></View>
        </View>
      );
    }

  }

}



AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
