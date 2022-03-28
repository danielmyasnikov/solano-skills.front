import { combineReducers } from 'redux';
import terminalReducer from './terminal/reducer';
import coursesReducer from './courses/reducer';
import courseReducer from './course/reducer';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';
import bashShellReducer from './bashShell/reducer';
import tariffsReducer from './tariffs/reducer';
import progressReducer from './progress/reducer';
import feedbackReducer from './feedback/reducer';
import onBoardReducer from './onBoard/reducer';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';
import { exercisesSlice } from '@src/features/exercises/store/slices/exercises.slice';
import { certificateApi } from '../features/certificates/certificates.api';

const rootReducer = combineReducers({
  terminal: terminalReducer,
  exercise: exerciseSlice.reducer,
  exercises: exercisesSlice.reducer,
  courses: coursesReducer,
  auth: authReducer,
  course: courseReducer,
  profile: profileReducer,
  [certificateApi.reducerPath]: certificateApi.reducer,
  bashShell: bashShellReducer,
  tariffs: tariffsReducer,
  progress: progressReducer,
  feedback: feedbackReducer,
  tracks: onBoardReducer,
});

export default rootReducer;
