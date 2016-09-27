// @flow

import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';

type Stop = {
    nameZh: string,
    stopId: number,
    position: MysqlPosition,
}
type Props = {
    stops: Stop[]
}

export default class NearbyStopMap extends Component {

    props: Props;

    static propTypes = {
        stops: PropTypes.array,
    }

    render() {
        const {stops} = this.props;
        const stopMarker = stops.map((stop) => {
            const coordinate = stop.position.coordinates;
            return (
                <MapView.Marker
                    key={stop.stopId}
                    title={stop.nameZh}
                    coordinate={{
                        longitude: coordinate[0],
                        latitude: coordinate[1]
                    }}
                />
            );
        });

        return (
            <View>
                {stopMarker}
            </View>
        );
    }
}
