
import React, {
    Component,
    PropTypes,
} from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AppRegistry
} from 'react-native';

import Color from './color';
import Header from './weather/header';
import SMG from './swift-motion-graph';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.White,
    },
    headerButton: {
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: Color.BlueDark,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});


export default class SwiftMotionPage extends Component {


    state = {
        showMax: true,
    };


    constructor(props){
        super(props);
    }

    render() {

        const {
            name
        } = this.props;


        const graphProps = {};
        graphProps.data = [];
        graphProps.xAccessor = d => new Date(d.time * 1000);
        graphProps.yAccessor = d => 100;

        return (
            <View style={styles.container}>
                <Header>
                    <TouchableOpacity
                        style={styles.headerButton}
                    >
                        <Text style={styles.headerText}>
                            Holo
                        </Text>
                    </TouchableOpacity>
                </Header>
                <View style={styles.content}>

                    <SMG {...graphProps} />

                </View>
            </View>
        );
    }
}



AppRegistry.registerComponent('swift-motion-page', () => SwiftMotionPage);