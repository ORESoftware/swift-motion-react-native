
'use strict';

import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  AsyncStorage
} from 'react-native';


import * as firebase from 'firebase';
import Button from './button';
import Header from './header';
import Signup from './signup';
import Account from './account';
import app from '../db/firebase-init'
import styles from '../styles/common.js';


export default class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render(){
    return (
      <View style={styles.container}>

        <Header text='Login' loaded={this.state.loaded} />

        <View style={styles.body}>

          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={'Email Address'}
          />

          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={'Password'}
          />

          <Button
            text='Login'
            onpress={this.login.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text} />

          <Button
            text='New here?'
            onpress={this.goToSignup.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text} />

        </View>

      </View>
    );
  }

  login(){

    this.setState({
      loaded: false
    });

    firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(userData => {

             this.setState({
                loaded: true
              });

            AsyncStorage.setItem('user_data', JSON.stringify(userData))
            .then(() => {
               this.props.navigator.push({
                     component: Account
               });
            },
              (err) => {
                 alert('Error: Could not save to async storage.');
            });


        }, error => {
             console.error(error.stack || error);
             alert('Login Failed. Please try again');
        });


  }

  goToSignup(){
    this.props.navigator.push({
      component: Signup
    });
  }

}

AppRegistry.registerComponent('login', () => Login);