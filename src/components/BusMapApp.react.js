// @flow
import React, {Component, PropTypes} from 'react';
import {
  Dimensions,
  View
} from 'react-native';
import NearbyStopMapContainer from './NearbyStopMapContainer.react';
import MapView from 'react-native-maps';

const width: number = Dimensions.get('window').width;

type Coordinate = { longitude: number, latitude: number};
type UserLocation = { coords: Coordinate }
type Props = { userLocation: UserLocation}

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

    render() {
        const {userLocation} = this.props;

        const mapOverlap = (userLocation) ? (
            <NearbyStopMapContainer
                coordinate={userLocation.coords}
            />
        ) : null;

        return (
            <View style={{flex: 1}}>
                <MapView
                    ref="map"
                    style={{flex: 1, width}}
                    showsUserLocation={true}
                >
                    {mapOverlap}
                </MapView>
            </View>
        );
    }
}
