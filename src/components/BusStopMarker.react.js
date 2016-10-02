// @flow
import React, {Component, PropTypes} from 'react';
import MapView from 'react-native-maps';
import BusStopBriefView from './BusStopBriefView.react';
import shallowCompare from 'react-addons-shallow-compare';
import StopAction from '../actions/StopAction';

type Props = {
    stop: CompoundStop,
    routes: Route[],
    onPress: () => void
 }

type State = {};

export default class BusStopMarker extends Component {

    props: Props;
    state: State;

    static propTypes = {
        stop: PropTypes.object
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return shallowCompare(this, nextProps, nextState);
    }

    _handleCalloutPress = () => {
        StopAction.setDetailStop(this.props.stop);
    }

    render() {
        const {
            stop,
            routes,
        } = this.props;
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
                <BusStopBriefView stop={stop} routes={routes} />
            </MapView.Marker>
        );
    }
}
