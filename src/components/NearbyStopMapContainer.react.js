// @flow
import React, {Component, PropTypes} from 'react';
import {Container} from 'flux/utils';
import NearbyStopMap from './NearbyStopMap.react';
import StopStore from '../stores/StopStore';
import StopAction from '../actions/StopAction';

type State = { stops: CompoundStop[] }
type Props = {
    coordinate: Coordinate,
}

class NearbyStopMapContainer extends Component {

    static propTypes = {
        coordinate: PropTypes.object,
    }

    props: Props;
    state: State;

    static getStores() {
        return [StopStore];
    }

    static calculateState() {
        return {
            stops:  StopStore.getStops()
        };
    }

    constructor(props: Props) {
        super(props);
        this.state = {
            stops: []
        };
    }

    componentWillMount() {
        const coordinate = this.props.coordinate;

        if (coordinate) {
            StopAction.getStopsByLocation(coordinate.longitude, coordinate.latitude, 0.003);
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        const coordinate = nextProps.coordinate;

        if (this.props.coordinate !== coordinate) {
            StopAction.getStopsByLocation(coordinate.longitude, coordinate.latitude, 0.003);
        }
    }

    render() {
        const {stops} = this.state;

        return (
            <NearbyStopMap stops={stops} />
        );
    }
}

export default Container.create(NearbyStopMapContainer, {withProps: true});
