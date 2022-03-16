import { combineReducers } from 'redux';
import exerciseReducer from './exercise/reducer';
import terminalReducer from './terminal/reducer';
import coursesReducer from './courses/reducer';
import courseReducer from './course/reducer';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';
import bashShellReducer from './bashShell/reducer';
import tariffsReducer from './tariffs/reducer';
import progressReducer from './progress/reducer';

const rootReducer = combineReducers({
  terminal: terminalReducer,
  exercise: exerciseReducer,
  courses: coursesReducer,
  auth: authReducer,
  course: courseReducer,
  profile: profileReducer,
  bashShell: bashShellReducer,
  tarriffs: tariffsReducer,
  progress: progressReducer,
});

export default rootReducer;
