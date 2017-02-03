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

  componentWillMount(){
    this.computeNextState(this.props);
  }

  componentWillReceiveProps(nextProps){
     this.computeNextState(nextProps);
  }

  render() {

    const {
      graphWidth,
      graphHeight,
      linePath
    }
     = this.state;


    return (
      <View style={styles.container}>
       <Surface width={graphWidth} height={graphHeight}>
       <Group x={0} y={0}>
       <Shape
         d={linePath}
         stroke={Color.Orange}
         strokeWdith={1}
        />
        </Group>
        </Surface>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);