import React from 'react';
import {
  Dimensions,
  View
} from 'react-native';
import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window');

export default class BusMapApp extends React.Component {

    static propTypes = {
        stops: React.PropTypes.array,
        userLocation: React.PropTypes.object
    }

    static defaultProps = {
        stops: []
    }

    componentWillReceiveProps(nextProps) {
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
        return (
            <View style={{flex: 1}}>
                <MapView
                    ref="map"
                    style={{flex: 1, width}}
                    showsUserLocation={true}
                >
                </MapView>
            </View>
        );
    }
}
