import { call, takeLeading, put } from 'redux-saga/effects';
import { coursesApi } from '../api/courses';
import { LOAD_COURSES } from './actions';

export function* loadCourcesList() {
  try {
    const response = yield call(coursesApi);
    yield put({
      type: LOAD_COURSES,
      payload: response,
    });
  } catch (e) {}
}

export default function* coursesSaga() {
  yield takeLeading(LOAD_COURSES, loadCourcesList);
}
