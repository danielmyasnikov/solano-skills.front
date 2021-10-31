import axios from 'axios';
import { call, takeLeading, put } from 'redux-saga/effects';
import { GET_EXERCISE } from './actions';

const getExerciseApi = ({courseId, exerciseId}) => {
  return axios
    .get(`${API_COURSE}/api/v1/courses/${courseId}/exercises/${exerciseId}`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    })
};

export function* getExercise({ payload }) {
  const response = yield call(getExerciseApi, payload);

  yield put({
    type: GET_EXERCISE,
    payload: response,
  });
}

export default function* exerciseSaga() {
  yield takeLeading(GET_EXERCISE, getExercise);
}
