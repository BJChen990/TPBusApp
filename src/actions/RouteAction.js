import AppDispatcher from '../AppDispatcher';

class RouteAction {
    static getRoutePath(routeId) {
        AppDispatcher.dispatch({
            actionType: 'setCurrentRoute',
            routeId
        })
    }
}
