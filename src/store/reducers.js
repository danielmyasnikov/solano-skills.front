import {combineReducers} from 'redux';
import exerciseReducer from './exercise/reducer';
import terminalReducer from './terminal/reducer';

const rootReducer = combineReducers({
    terminal: terminalReducer,
    exercise: exerciseReducer,
})

export default rootReducer;