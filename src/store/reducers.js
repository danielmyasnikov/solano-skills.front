import {combineReducers} from 'redux';
import exerciseReducer from './exercise/reducer';
import terminalReducer from './terminal/reducer';
import coursesReducer from './courses/reducer';

const rootReducer = combineReducers({
    terminal: terminalReducer,
    exercise: exerciseReducer,
    courses: coursesReducer,
})

export default rootReducer;