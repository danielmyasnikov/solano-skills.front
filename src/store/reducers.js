import { combineReducers } from 'redux';
import exerciseReducer from './exercise/reducer';
import terminalReducer from './terminal/reducer';
import coursesReducer from './courses/reducer';
import courseReducer from './course/reducer';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
  terminal: terminalReducer,
  exercise: exerciseReducer,
  courses: coursesReducer,
  auth: authReducer,
  course: courseReducer,
});

export default rootReducer;
