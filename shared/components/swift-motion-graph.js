/* eslint-disable react/no-array-index-key */
import React, {
    Component,
    PropTypes,
} from 'react';


import {
    AppRegistry,
    ART,
    Dimensions,
    LayoutAnimation,
    StyleSheet,
    Text,
    View,
} from 'react-native';


import Morph from 'art/morph/path';
import * as graphUtils from './graph-utils';
import Color from './weather/color';

import socket from '../comm/handle-udp';


const {
    Group,
    Shape,
    Surface,
} = ART;


const PaddingSize = 20;
const TickWidth = PaddingSize * 2;
const AnimationDurationMs = 500;


const styles = StyleSheet.create({
    container: {},

    tickLabelX: {
        position: 'absolute',
        bottom: 0,
        fontSize: 12,
        textAlign: 'center',
    },

    ticksYContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },

    tickLabelY: {
        position: 'absolute',
        left: 0,
        backgroundColor: 'transparent',
    },

    tickLabelYText: {
        fontSize: 12,
        textAlign: 'center',
    },

    ticksYDot: {
        position: 'absolute',
        width: 2,
        height: 2,
        backgroundColor: Color.Black,
        borderRadius: 100,
    },
});


const dimensionWindow = Dimensions.get('window');


export default class SwiftMotionGraph extends Component {


    static defaultProps = {
        width: Math.round(dimensionWindow.width * 0.9),
        height: Math.round(dimensionWindow.height * 0.5),
    };

    state = {
        graphWidth: 0,
        graphHeight: 0,
        linePath: '',
    };

    constructor(props) {
        super(props);

    }

    componentDidMount(){
        const {

            data,
            width,
            height,
            xAccessor,
            yAccessor,

        } = this.props;

        const fullPaddingSize = PaddingSize * 2;
        const graphWidth = width - fullPaddingSize;
        const graphHeight = height - fullPaddingSize;

        const lineGraph = graphUtils.createLineGraph({
            data,
            xAccessor,
            yAccessor,
            width: graphWidth,
            height: graphHeight,
        });

        console.log('lineGraph => ',JSON.stringify(lineGraph));

        this.setState({
            graphWidth,
            graphHeight,
            linePath: lineGraph.path,
            ticks: lineGraph.ticks,
            scale: lineGraph.scale,
        });
    }

    componentWillMount() {
        this.dataListener = this.onNewData.bind(this);
        socket.on('message', this.dataListener);
    }

    componentWillUnmount() {
        socket.removeListener('message', this.dataListener);
    }


    onNewData(d) {

        console.log('new data => ', d);

        const {

            data,
            width,
            height,
            xAccessor,
            yAccessor,

        } = this.props;


        if (data.length > 10) {
            data.shift();
        }


        d = JSON.parse(d);
        data.push(d);

        const fullPaddingSize = PaddingSize * 2;
        const graphWidth = width - fullPaddingSize;
        const graphHeight = height - fullPaddingSize;

        const lineGraph = graphUtils.createLineGraph({
            data,
            xAccessor,
            yAccessor,
            width: graphWidth,
            height: graphHeight,
        });


        console.log(' lineGraph => ', JSON.stringify(lineGraph));

        this.setState({
            graphWidth,
            graphHeight,
            linePath: lineGraph.path,
            ticks: lineGraph.ticks,
            scale: lineGraph.scale,
        });


    }


    render() {

        //  'lineGraph => ', '{"data":[],"scale":{},"path":null,"ticks":[]}'


        const {
            yAccessor,
        } = this.props;

        let {
            graphWidth,
            graphHeight,
            linePath,
            ticks,
            scale,
        } = this.state;

        scale = scale || {};
        ticks = ticks || [];

        console.log(' linePath => ', JSON.stringify(linePath));

        const {
            x: scaleX,
        } = scale;

        // const tickXFormat = scaleX.tickFormat(null, '%b %d');

        return (
            <View style={styles.container}>
                <Surface width={graphWidth} height={graphHeight}>
                    <Group x={0} y={0}>
                        <Shape
                            d={linePath}
                            stroke={Color.Orange}
                            strokeWidth={1}
                        />
                    </Group>
                </Surface>

                <View key={'ticksX'}>
                    {ticks.map((tick, i) => {
                        const tickStyles = {};
                        tickStyles.width = TickWidth;
                        tickStyles.left = tick.x - (TickWidth / 2);

                        return (
                            <Text key={i} style={[styles.tickLabelX, tickStyles]}>
                                {/*{tickXFormat(new Date(tick.datum.time * 1000))}*/}
                            </Text>
                        );
                    })}
                </View>

                <View key={'ticksY'} style={styles.ticksYContainer}>
                    {ticks.map((tick, index) => {
                        const value = yAccessor(tick.datum);

                        const tickStyles = {};
                        tickStyles.width = TickWidth;
                        tickStyles.left = tick.x - Math.round(TickWidth * 0.5);

                        tickStyles.top = (tick.y + 2) - Math.round(TickWidth * 0.65);

                        return (
                            <View key={index} style={[styles.tickLabelY, tickStyles]}>
                                <Text style={styles.tickLabelYText}>
                                    {value}&deg;
                                </Text>
                            </View>
                        );
                    })}
                </View>

                <View key={'ticksYDot'} style={styles.ticksYContainer}>
                    {ticks.map((tick, index) => (
                        <View
                            key={index}
                            style={[styles.ticksYDot, {
                                left: tick.x,
                                top: tick.y,
                            }]}
                        />
                    ))}
                </View>
            </View>
        );
    }
}


AppRegistry.registerComponent('swift-motion-graph', () => SwiftMotionGraph);