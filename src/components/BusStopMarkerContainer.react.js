import React, {Component} from 'react';
import BusStopMarker from './BusStopMarker.react';
import {Container} from 'flux/utils';
import RouteAction from '../actions/RouteAction';
import RouteStore from '../stores/RouteStore';

type Props = {
    stop: CompoundStop,
}
type State = {
    routes: ?Route[]
}

class BusStopMarkerContainer extends Component {

    props: Props;
    state: State;

    constructor(props) {
        super(props);
        this.state = {
            routes: []
        };
    }

    static getStores() {
        return [RouteStore];
    }

    static calculateState(prevStore, props) {
        return {
            routes: RouteStore.getRoutesByJson(props.stop.routeIds)
        };
    }

    componentWillMount() {
        RouteAction.requestRoute(this.props.stop.routeIds);
    }

    render() {
        return (
            <BusStopMarker
                {...this.props}
                routes={this.state.routes}
            />
        );
    }
}

export default Container.create(BusStopMarkerContainer, {withProps: true});
