// @flow
import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';
import BusStopMarkerContainer from './BusStopMarkerContainer.react';

type Props = {
    stops: CompoundStop[],
}

export default class NearbyStopMap extends Component {

    props: Props;

    static propTypes = {
        stops: PropTypes.array,
    }

    render() {
        const {stops} = this.props;
        const stopMarker = stops.map((stop) => {
            return (
                <BusStopMarkerContainer
                    key={stop.id}
                    stop={stop}
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
