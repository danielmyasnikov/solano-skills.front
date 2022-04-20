import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import profileReducer from './profile/reducer';
import progressReducer from './progress/reducer';
import feedbackReducer from './feedback/reducer';
import { exerciseSlice } from '@src/features/exercises/store/slices/exercise.slice';
import { exercisesSlice } from '@src/features/exercises/store/slices/exercises.slice';
import { certificateApi } from '../features/certificates/certificates.api';
import { globalReducers } from '@store/global';
import { tracksSlice } from '../features/onBoard/store/slice';
import { paymentSlice } from '@src/features/payment/store/slice';
import { coursesApi } from '@src/features/courses/courses.api.ts';
import { tariffsApi } from '@src/features/payment/store/tariffs.api';
import { skillApi } from '@src/features/skills/skills.api';
import { professionApi } from '@src/features/professions/professions.api';
import { profileSlice } from '../features/profile/store/slice';
import { newProgressSlice } from '../features/courses/store/progress/slice';
import { terminalSlice } from '@src/features/exercises/store/slices/terminal.slice';
import { bashSlice } from '@src/features/exercises/store/slices/bash.slice';
import { exercisesApi } from '@src/features/exercises/store/exercises.api';
import { paymentsApi } from '@src/features/payment/store/payments.api';

const rootReducer = combineReducers({
  global: globalReducers,
  terminal: terminalSlice.reducer,
  exercise: exerciseSlice.reducer,
  exercises: exercisesSlice.reducer,
  payment: paymentSlice.reducer,
  auth: authReducer,
  profile: profileReducer,
  bash: bashSlice.reducer,
  progress: progressReducer,
  feedback: feedbackReducer,
  tracks: tracksSlice.reducer,
  newProfile: profileSlice.reducer,
  newProgress: newProgressSlice.reducer,
  [certificateApi.reducerPath]: certificateApi.reducer,
  [coursesApi.reducerPath]: coursesApi.reducer,
  [tariffsApi.reducerPath]: tariffsApi.reducer,
  [professionApi.reducerPath]: professionApi.reducer,
  [skillApi.reducerPath]: skillApi.reducer,
  [exercisesApi.reducerPath]: exercisesApi.reducer,
  [paymentsApi.reducerPath]: paymentsApi.reducer,
});

export default rootReducer;
