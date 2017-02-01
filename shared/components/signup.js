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
      loaded: true,
      email: '',
      password: ''
    };
  }

  signup(){

    this.setState({
      loaded: false
    });


   firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(userData => {

           console.log('user data => ', userData);

           this.setState({
                email: '',
                password: '',
                loaded: true
              });

         alert('Your account was created! => ' + JSON.stringify(userData));

           AsyncStorage.setItem('user_data', JSON.stringify(userData))
            .then(() => {
               this.props.navigator.push({
                     component: Account
               });
            },
              (err) => {
                 alert('Error: Could not save to async storage.');
            });


        }, (error) => {

              alert(error);
             alert(error.code);

          switch(error.code){


                  case 'auth/email-already-in-use':
                    alert('Email address already in use.');
                  break;

                  case 'INVALID_EMAIL':
                    alert('The specified email is not a valid email.');
                  break;

                  default:
                    alert('Error creating user:');
                }

        })

  }

  goToLogin(){
    this.props.navigator.push({
      component: Login
    });
  }

  render() {
    return (
      <View style={styles.container}>

        <Header text='Signup' loaded={this.state.loaded} />

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
            text='Signup'
            onpress={this.signup.bind(this)}
            button_styles={styles.primary_button}
            button_text_styles={styles.primary_button_text}
            />

          <Button
            text='Got an Account?'
            onpress={this.goToLogin.bind(this)}
            button_styles={styles.transparent_button}
            button_text_styles={styles.transparent_button_text}
            />

        </View>
      </View>
    );
  }
}

AppRegistry.registerComponent('signup', () => signup);