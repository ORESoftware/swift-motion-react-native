'use strict';


import React, {Component} from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage
}
from 'react-native';


import * as firebase from 'firebase';
import Button from './button';
import Header from './header';
import Login from './login';
import styles from '../styles/common';
import app from '../db/firebase-init'
import socket from '../comm/handle-udp';
import App from './weather/app';



export default class Account extends Component {

  constructor(props){

    super(props);
    this.state = {
      loaded: false,
    }

  }

  componentWillMount(){

    AsyncStorage.getItem('user_data').then((userData) => {
      let ud = JSON.parse(userData);
      this.setState({
        user: ud,
        loaded: true
      });
    });

  }

  logout(){

      AsyncStorage.removeItem('user_data').then(() => {
        firebase.auth().signOut().then(() => {
           this.props.navigator.push({
                component: Login
              });
        }, err => {
            console.error(err.stack || err);
            alert('Error: Could not log out.');
        });

      });

    }


   goToBetterWeather(){
      this.props.navigator.push({
            component: App
       });
   }


  render(){

    return (
      <View style={styles.container}>
        <Header text='Account' loaded={this.state.loaded} />
        <View style={styles.body}>
        {
          this.state.user &&
            <View style={styles.body}>
              <View style={page_styles.email_container}>
                <Text style={page_styles.email_text}>{this.state.user.email}</Text>
              </View>
              <Image
                style={styles.image}
                source={{uri: this.state.user.profileImageURL}}
              />
              <Button
                  text='Logout'
                  onpress={this.logout.bind(this)}
                  button_styles={styles.primary_button}
                  button_text_styles={styles.primary_button_text} />

            <Button
                text='BetterWeather'
                onpress={this.goToBetterWeather.bind(this)}
                button_styles={styles.primary_button}
                button_text_styles={styles.primary_button_text} />
            </View>
        }
        </View>
      </View>
    );
  }

}

const page_styles = StyleSheet.create({
  email_container: {
    padding: 20
  },
  email_text: {
    fontSize: 18
  }
});


AppRegistry.registerComponent('account', () => Account);