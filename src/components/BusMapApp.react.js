// @flow
import React, {Component, PropTypes} from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import StopDetailMapOverlay from './StopDetailMapOverlay.react';
import NearbyStopMapContainer from './NearbyStopMapContainer.react';
import MapView from 'react-native-maps';
import StopDetailMapContainer from './StopDetailMapContainer.react';

const width: number = Dimensions.get('window').width;

type Props = {
    userLocation: ?Position,
    detailStop: ?CompoundStop,
    detailRoute: ?Route
};

export default class BusMapApp extends Component {

    props: Props;
    
    static propTypes = {
        userLocation: PropTypes.object
    }

    componentWillReceiveProps(nextProps: Props) {
        if (!this.props.userLocation && nextProps.userLocation) {
            const {longitude, latitude} = nextProps.userLocation.coords;

            this.refs.map.animateToRegion({
                longitude,
                latitude,
                longitudeDelta: 0.01,
                latitudeDelta: 0.01
            }, 3000);
        }
    }

    _getMapOverlay() {
        const {
            userLocation,
            detailStop,
            detailRoute
        } = this.props;

        if (!userLocation) {
            return null;
        } else if (detailStop) {
            return (
                <StopDetailMapContainer
                    stop={detailStop}
                    overlayRoute={detailRoute}
                    detailRoute={detailRoute}
                />
            );
        } else {
            return (
                <NearbyStopMapContainer
                    coordinate={userLocation.coords}
                />
            );
        }
    }

    _getAppOverlay() {
        const {
            userLocation,
            detailStop,
            detailRoute,
        } = this.props;

        if (!userLocation) {
            return null;
        } else if (detailStop) {
            return (
                <StopDetailMapOverlay
                    detailStop={detailStop}
                    detailRoute={detailRoute}
                />
            );
        } else {
            return null;
        }
    }

    render() {
        const mapOverlay = this._getMapOverlay();
        const appOverlay = this._getAppOverlay();

        return (
            <View style={{flex: 1}}>
                <MapView
                    ref="map"
                    style={{flex: 1, width}}
                    showsUserLocation={true}
                >
                    {mapOverlay}
                </MapView>
                {appOverlay}
            </View>
        );
    }
}
