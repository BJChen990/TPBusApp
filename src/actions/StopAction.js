import AppDispatcher from '../AppDispatcher';

export default class StopAction {
    static getStopsByLocation(longitude, latitude, radius = 0.05) {
        const url = `http://192.168.31.158:3000/stops/nearby/${longitude}/${latitude}/${radius}/`;

        fetch(url, {method: 'GET'})
        .then((response) => {
            return response.json();
        })
        .then((stops) => {
            AppDispatcher.dispatch({
                type: 'updateStops',
                stops
            });
        });
    }

    static setDetailStop(stop: CompoundStop) {
        AppDispatcher.dispatch({
            type: 'updateDetailStop',
            stop
        });
    }

    static clearDetailStop() {
        AppDispatcher.dispatch({
            type: 'updateDetailStop',
            stop: null
        });
    }
}
