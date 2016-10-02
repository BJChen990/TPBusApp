// @flow

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import BusMapAppContainer from './src/components/BusMapAppContainer.react';

class App extends Component {
    render() {
        return (<BusMapAppContainer />);
    }
}

AppRegistry.registerComponent('TestProject', () => App);
