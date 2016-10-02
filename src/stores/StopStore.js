import {Store} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';

type Action = {
    [type: string]: string,
}

class StopStore extends Store {

    constructor(dispatcher) {
        super(dispatcher);
        this._stops = [];
        this._detailStop = null;
    }

    getStops() {
        return this._stops;
    }

    getDetailStop() {
        return this._detailStop;
    }

    __onDispatch(action: Action) {
        const actionType = action.type;

        switch (actionType) {
        case 'updateStops':
            this._stops = action.stops;
            this.__emitChange();
            break;
        case 'updateDetailStop':
            this._detailStop = action.stop;
            this.__emitChange();
            break;
        default:
            console.log(`Action type not found in StopStore: ${actionType}`);
        }
    }
}

export default new StopStore(AppDispatcher);
