// @flow
import AppDispatcher from '../AppDispatcher';
import {ToastAndroid} from 'react-native';

export default class RouteAction {
    static requestRoute(routeIds: string) {

        const url = `http://192.168.31.158:3000/routes/${routeIds}/`;

        fetch(url, {method: 'GET'})
        .then((response) => {
            return response.json();
        })
        .then((routes: Route[]) => {
            AppDispatcher.dispatch({
                type: 'updateRoutes',
                routes
            });
        })
        .catch((err: Error) => {
            ToastAndroid.show(err.stack, 5000);
            console.error(err.stack);
        });
    }

    static updateDetailRoute(routeId: number) {
        AppDispatcher.dispatch({
            type: 'updateRoutes',
            detailRouteId: routeId
        });
    }
}
