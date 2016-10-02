import React, { Component } from 'react';
import {
    View,
    Text,
    ToolbarAndroid,
    ListView,
    TouchableHighlight,
 } from 'react-native';
import {Container} from 'flux/utils';
import RouteStore from '../stores/RouteStore';
import RouteAction from '../actions/RouteAction';
import StopAction from '../actions/StopAction';

const DEFAULT_LIST_ROW_CHANCED = (r1, r2) => (r1 !== r2);
const dataSource = new ListView.DataSource({rowHasChanged: DEFAULT_LIST_ROW_CHANCED});

type Props = {
    detailStop: CompoundStop
}

class StopDetailMapOverlay extends Component {

    props: Props;

    static getStores() {
        return [RouteStore];
    }

    static calculateState(state, props) {
        return {
            routeListData: dataSource.cloneWithRows(RouteStore.getRoutesByJson(props.detailStop.routeIds)),
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            routeListData: dataSource.cloneWithRows([]),
        };
    }

    _handleRouteListItemTouch = () => {
        RouteAction.updateDetailRoute();
    }

    _handleBackTouch = () => {
        StopAction.clearDetailStop();
    }

    _renderRouteRow = (route: Route) => {
        return (
            <TouchableHighlight onTouch={this._handleRouteListItemTouch}>
                <Text style={{height: 50}}>{route.nameZh}</Text>
            </TouchableHighlight>
        );
    }

    render() {
        const {detailStop} = this.props;

        return (
            <View
                style={{top: 0, bottom: 0, right: 0, left: 0, position: 'absolute'}}
                stop={detailStop}
            >
                <ToolbarAndroid
                    style={{height: 60, backgroundColor: 'grey'}}
                    actions={[{
                        title: 'back',
                        show: 'always',
                        showWithText: true
                    }]}
                    onActionSelected={this._handleBackTouch}
                />
                <View style={{flex: 1}}/>
                <View style={{bottom: 0, height: 200, backgroundColor: 'white'}}>
                    <ListView
                        style={{flex: 1}}
                        dataSource={this.state.routeListData}
                        renderRow={this._renderRouteRow}
                    />
                </View>
            </View>
        );
    }
}

export default Container.create(StopDetailMapOverlay, {withProps: true});
