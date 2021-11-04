import { call, takeLeading, put } from 'redux-saga/effects';
import { courseApi } from '../api/courses';
import { LOAD_COURSES } from './actions';

export function* loadCourcesList() {
  try {
    const response = yield call(courseApi);
    yield put({
      type: LOAD_COURSES,
      payload: response,
    });
    console.log(response)
  } catch (e) {}
}

export default function* coursesSaga() {
  yield takeLeading(LOAD_COURSES, loadCourcesList);
}
