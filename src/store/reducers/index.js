import {combineReducers} from 'redux';
import terminalReducer from './terminal';

const initial = {};

export function appReducer(state = initial, action) {
    return state;
}

const rootReducer = combineReducers({
    app: appReducer,
    terminal: terminalReducer,
})

export default rootReducer;