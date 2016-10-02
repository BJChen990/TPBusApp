import {MapStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import Immutable from 'immutable';

type Action = {
    [type: string]: string,
}

class StopStore extends MapStore {

    getInitialState() {
        return Immutable.Map({detailRoute: null});
    }

    getRoutesByJson(json: string) {
        const routeIds: number[] = JSON.parse(json);
        const requestLength = routeIds.length;
        let results: Route[] = [];

        for (let i = 0; i < requestLength; i++) {
            let currentRouteId = routeIds[i];
            let targetRoute = this.get(currentRouteId);

            if (!targetRoute) {
                return [];
            }

            results.push(targetRoute);
        }

        return results;
    }

    reduce(state, action: Action) {
        const actionType = action.type;

        switch (actionType) {
        case 'updateRoutes':
            return state.withMutations((_state) => {
                const routes: Route[] = action.routes;
                const routeLength = routes.length;

                for (let i = 0; i < routeLength; i++) {
                    let currentRoute = routes[i];

                    if (!_state.get(currentRoute.routeId)) {
                        _state.set(currentRoute.routeId, currentRoute);
                    }
                }
            });
        case 'updateDetailRoute':
            return state.set('detailRoute', action.detailRouteId);
        default:
            return state;
        }
    }
}

export default new StopStore(AppDispatcher);
