import AppDispatcher from '../AppDispatcher';
import {ToastAndroid} from 'react-native';
import GeoLocationUtil from '../utils/GeoLocationUtil';

export default class UserLocationAction {
    static requestUserLocation() {
        GeoLocationUtil.requestGPS()
        .then((userLocation) => {
            AppDispatcher.dispatch({
                type: 'updateUserLocation',
                userLocation
            });
        })
        .catch((err: Error) => {
            ToastAndroid.show(err.stack, 5000);
            console.error(err.stack);
        });
    }
}
