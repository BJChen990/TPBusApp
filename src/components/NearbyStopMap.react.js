// @flow
import React, {Component, PropTypes} from 'react';
import {View} from 'react-native';
import BusStopMarker from './BusStopMarker';

type Props = {
    stops: CompoundStop[],
    onCalloutPress: (stop: CompoundStop) => void
}

export default class NearbyStopMap extends Component {

    props: Props;

    static propTypes = {
        stops: PropTypes.array,
        onCalloutPress: PropTypes.func
    }

    render() {
        const {stops} = this.props;
        const stopMarker = stops.map((stop) => {
            return (
                <BusStopMarker
                    key={stop.id}
                    stop={stop}
                    onCalloutPress={this.props.onCalloutPress}
                />);
        });

        return (
            <View>
                {stopMarker}
            </View>
        );
    }
}
