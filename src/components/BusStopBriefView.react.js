// @flow
import React, {Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import {View, Text} from 'react-native';
import MapView from 'react-native-maps';

type Props = {
    stop: CompoundStop,
    routes: Route[]
}

export default class BusStopBriefView extends Component {

    props: Props;
    state: {};

    shouldComponentUpdate(nextProps: Props, nextState: {}) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        const {
            stop,
            routes,
        } = this.props;

        const routeNames = routes.map((route) => (
            <Text key={stop.nameZh + route.routeId}>
                {route.nameZh}
            </Text>
            )
        );

        return (
            <MapView.Callout style={{position: 'absolute', width: 300, height: 300}}>
                <View style={{top: 0, bottom: 0, right: 0, left: 0, position: 'absolute'}}>
                    <Text>{stop.nameZh}</Text>
                    <Text>{(stop.goBack === 1) ? '去程' : '回程'}</Text>
                        {routeNames}
                </View>
            </MapView.Callout>
        );
    }
}
