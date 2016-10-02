import React, {Component} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';

type Props = {
    stop: CompoundStop
}

export default class StopDetailMapContainer extends Component {

    props: Props;

    render() {
        const coordinates = this.props.stop.position.coordinates;
        const coordinate = {
            longitude: coordinates[0],
            latitude: coordinates[1]
        };

        return (
            <View>
                <MapView.Marker coordinate={coordinate} />
            </View>
        );
    }
}
