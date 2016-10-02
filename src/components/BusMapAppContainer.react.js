// @flow

import React, {Component} from 'react';
import {Container} from 'flux/utils';
import BusMapApp from './BusMapApp.react';
import StopStore from '../stores/StopStore';
import RouteStore from '../stores/RouteStore';
import UserLocationStore from '../stores/UserLocationStore';
import UserLocationAction from '../actions/UserLocationAction';

type State = {
    userLocation: ?Position,
    detailStop: ?CompoundStop,
    detailRoute: ?Route
}
type Props = {};

class BusMapAppContainer extends Component {

    props: Props;
    state: State;

    componentDidMount() {
        UserLocationAction.requestUserLocation();
    }

    static getStores() {
        return [UserLocationStore, StopStore, RouteStore];
    }

    static calculateState() {
        return {
            userLocation: UserLocationStore.getUserLocation(),
            detailStop: StopStore.getDetailStop(),
            focusRoute: RouteStore.get(RouteStore.get('detailRouteId'))
        };
    }

    render() {
        const {
            userLocation,
            detailStop,
            detailRoute
        } = this.state;

        return (
            <BusMapApp
                userLocation={userLocation}
                detailStop={detailStop}
                detailRoute={detailRoute}
            />
        );
    }
}

export default Container.create(BusMapAppContainer);
