import { combineReducers } from 'redux';
import terminalReducer from './terminal/reducer';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';
import bashShellReducer from './bashShell/reducer';
import progressReducer from './progress/reducer';
import feedbackReducer from './feedback/reducer';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';
import { exercisesSlice } from '@src/features/exercises/store/slices/exercises.slice';
import { certificateApi } from '../features/certificates/certificates.api';
import { globalReducers } from '@store/global';
import { tracksSlice } from '../features/onBoard/store/slice';
import { paymentSlice } from '@src/features/payment/store/slice';
import { coursesApi } from '@src/features/courses/courses.api';
import { tariffsApi } from '@src/features/payment/store/tariffs.api';
import { skillApi } from '@src/features/skills/skills.api';
import { professionApi } from '@src/features/professions/professions.api';

const rootReducer = combineReducers({
  global: globalReducers,
  terminal: terminalReducer,
  exercise: exerciseSlice.reducer,
  exercises: exercisesSlice.reducer,
  payment: paymentSlice.reducer,
  auth: authReducer,
  profile: profileReducer,
  bashShell: bashShellReducer,
  progress: progressReducer,
  feedback: feedbackReducer,
  tracks: tracksSlice.reducer,
  [certificateApi.reducerPath]: certificateApi.reducer,
  [coursesApi.reducerPath]: coursesApi.reducer,
  [tariffsApi.reducerPath]: tariffsApi.reducer,
  [professionApi.reducerPath]: professionApi.reducer,
  [skillApi.reducerPath]: skillApi.reducer,
});

export default rootReducer;
