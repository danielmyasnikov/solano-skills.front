import { combineReducers } from 'redux';
import exerciseReducer from './exercise/reducer';
import terminalReducer from './terminal/reducer';
import coursesReducer from './courses/reducer';
import courseReducer from './course/reducer';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';

const rootReducer = combineReducers({
  terminal: terminalReducer,
  exercise: exerciseReducer,
  courses: coursesReducer,
  auth: authReducer,
  course: courseReducer,
  profile: profileReducer,
});

export default rootReducer;
