import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import BusMapApp from './src/components/BusMapApp.react';
import GeoLocationUtil from './src/utils/GeoLocationUtil';

class BusMapAppContainer extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            userLocation: null,
            stops: []
        };
    }

    componentWillMount() {
        GeoLocationUtil.requestGPS()
            .then((position) => {
                this.setState({
                    userLocation: position
                });
                const {longitude, latitude} = position.coords;
                const url = `http://192.168.31.158:3000/stops/nearby/${longitude}/${latitude}/0.05/`;
                return fetch(url, {method: 'GET'});
            })
            .then((response) => {
                return response.json();
            })
            .then((stops: Object[]) => {
                this.setState({
                    stops
                });
            })
            .catch((err: Err) => {
                console.error(err);
            })
    }

    render() {
        const {
            stops,
            userLocation
        } = this.state;

        return (
            <BusMapApp
                stops={stops}
                userLocation={userLocation}
            />
        );
    }
}

AppRegistry.registerComponent('TestProject', () => BusMapAppContainer);
