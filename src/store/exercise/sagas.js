import axios from 'axios';
import { call, takeLeading, put } from 'redux-saga/effects';
import { API_URL_HEROKU } from '../../config';
import { GET_EXERCISE } from './actions';

const getExerciseA = ({courseId, exerciseId}) => {
  return axios
    .get(`${API_URL_HEROKU}/courses/${courseId}/exercises/${exerciseId}`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    })
};

export function* getExercise({ payload }) {
  const response = yield call(getExerciseA, payload);

  yield put({
    type: GET_EXERCISE,
    payload: response,
  });
}

export default function* exerciseSaga() {
  yield takeLeading(GET_EXERCISE, getExercise);
}
