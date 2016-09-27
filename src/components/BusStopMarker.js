// @flow
import React, {Component, PropTypes} from 'react';
import {View, Text} from 'react-native';
import MapView from 'react-native-maps';

type Props = { stop: CompoundStop, onCalloutPress: (stop: CompoundStop) => void }

export default class BusStopMarker extends Component {

    props: Props;

    static propTypes = {
        stop: PropTypes.object
    }

    _handleCalloutPress = () => {
        this.props.onCalloutPress(this.props.stop);
    }

    render() {
        const stop = this.props.stop;
        const coordinates = stop.position.coordinates;
        const coordinate = {
            longitude: coordinates[0],
            latitude: coordinates[1]
        };

        return (
            <MapView.Marker
                onCalloutPress={this._handleCalloutPress}
                coordinate={coordinate}
            >
                <MapView.Callout style={{position: 'absolute', width: 300, height: 300}}>
                    <View style={{top: 0, bottom: 0, right: 0, left: 0, position: 'absolute'}}>
                        <Text>{stop.nameZh}</Text>
                        <Text>{(stop.goBack === 1) ? '去程' : '回程'}</Text>
                        <Text>{stop.routeIds}</Text>
                        <Text>{stop.stopIds}</Text>
                    </View>
                </MapView.Callout>
            </MapView.Marker>
        );
    }
}
