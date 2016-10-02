import {Store} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';

type Action = {
    [type: string]: string,
}

class UserLocationStore extends Store {

    constructor(dispatcher) {
        super(dispatcher);
        this._userLocation = null;
    }

    getUserLocation() {
        return this._userLocation;
    }

    __onDispatch(action: Action) {
        const actionType = action.type;

        switch (actionType) {
        case 'updateUserLocation':
            this._userLocation = action.userLocation;
            this.__emitChange();
            break;
        default:
            console.log(`Action type not found in UserLocationStore: ${actionType}`);
        }
    }
}

export default new UserLocationStore(AppDispatcher);
