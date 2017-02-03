'use strict';

import React, {Component} from 'react';

import  {

  AppRegistry,
  Text,
  TextInput,
  View,
  AsyncStorage

}
from 'react-native';

import * as firebase from 'firebase';
import Button from './button';
import Header from './header';
import Login from './login';
import Account from './account';
import app from '../db/firebase-init'
import styles from '../styles/common.js';


export default class signup extends Component {

  constructor(props){

    super(props);

    this.state = {

    };
  }



  render() {
    return (
      <View style={styles.container}>

       <Header>
          <Text>{name}</Text>
       </Header>
       <WeatherGraph/>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);