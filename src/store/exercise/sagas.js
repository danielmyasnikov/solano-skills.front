import { call, takeLeading, put } from 'redux-saga/effects';
import { getExerciseApi } from '../api/exercise';
import { GET_EXERCISE_REQUESTED, GET_EXERCISE_SUCCESSED, GET_EXERCISE_FAILED } from './actions';

export function* getExercise(action) {
  try {
    const response = yield call(getExerciseApi, action.payload);
    yield put({
      type: GET_EXERCISE_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: GET_EXERCISE_FAILED,
      payload: {
        message: e.message,
      },
    });
  }
}

export default function* exerciseSaga() {
  yield takeLeading(GET_EXERCISE_REQUESTED, getExercise);
}
