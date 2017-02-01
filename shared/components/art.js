


import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
    ART
} from 'react-native';


const {
  Surface,
  Group,
  Shape,
} = ART;

const // data represents the distribution of spendings in a month
      data = [
          {'number':  8, 'name': 'Fun activities'},
          {'number': 7, 'name': 'Dog'},
          {'number': 16, 'name': 'Food'},
          {'number': 23, 'name': 'Car'},
          {'number': 42, 'name': 'Rent'},
          {'number':  4, 'name': 'Misc'},
        ];

export default class Art extends Component {


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native! Son
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Surface width={400} height={800}>

             <Group x={100} y={0}>
                              <Shape
                                d='M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80'
                                stroke='#000'
                                strokeWidth={1}
                                />
                            </Group>
        </Surface>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('art', () => Art);