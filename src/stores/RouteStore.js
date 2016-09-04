import {Store} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';

class RouteStore extends Store {
    __onDispatch(action) {
    }
}

export default new RouteStore(AppDispatcher);
