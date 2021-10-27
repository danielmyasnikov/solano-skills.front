import {combineReducers} from 'redux';
import exerciseReducer from './exercise/reducer';
import terminalReducer from './terminal/reducer';

const initial = {};

export function appReducer(state = initial, action) {
    return state;
}

const rootReducer = combineReducers({
    app: appReducer,
    terminal: terminalReducer,
    exercise: exerciseReducer,
})

export default rootReducer;