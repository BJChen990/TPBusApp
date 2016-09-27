// @flow
import React, {Component, PropTypes} from 'react';
import NearbyStopMap from './NearbyStopMap.react';

type State = { stops: Object[] }
type Props = { coordinate: Coordinate }

export default class NearbyStopMapContainer extends Component {

    static propTypes = {
        coordinate: PropTypes.object,
    }

    props: Props;
    state: State;

    constructor(props: Props) {
        super(props);
        this.state = {
            stops: []
        };
    }

    componentWillMount() {
        const coordinate = this.props.coordinate;

        if (coordinate) {
            this._fetchStops(coordinate);
        }
    }

    componentWillReceiveProps(nextProps: Props) {
        const coordinate = nextProps.coordinate;

        if (this.props.coordinate !== coordinate) {
            this._fetchStops(coordinate);
        }
    }

    _fetchStops = (coordinate: Coordinate) => {
        fetch(`http://192.168.31.158:3000/stops/nearby/${coordinate.longitude}/${coordinate.latitude}/0.003/`)
            .then((response) => {
                return response.json();
            })
            .then((stops: Object[]) => {
                this.setState({stops});
            });
    }

    render() {
        const {stops} = this.state;

        return (<NearbyStopMap stops={stops} />);
    }
}
