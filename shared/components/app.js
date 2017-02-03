import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    AppRegistry
} from 'react-native';

import SwiftMotionPage from './swift-motion-page';


const USE_FIXTURES = true;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});



export default class SwiftMotionApp extends Component {

    state = {

    };

    render() {
        return (
            <View style={styles.container}>
            <SwiftMotionPage>
            </SwiftMotionPage>
            </View>
        );
    }
}



AppRegistry.registerComponent('swift-motion-app', () => SwiftMotionApp);
