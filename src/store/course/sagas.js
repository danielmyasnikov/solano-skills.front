import { call, takeLeading, put } from 'redux-saga/effects';
import { getCourseApi } from '../api/course';
import { GET_COURSE_REQUESTED, GET_COURSE_SUCCESSED, GET_COURSE_FAILED } from './actions';

export function* getCourse(action) {
  try {
    const response = yield call(getCourseApi, action.payload);
    yield put({
      type: GET_COURSE_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: GET_COURSE_FAILED,
    });
  }
}

export default function* exerciseSaga() {
  yield takeLeading(GET_COURSE_REQUESTED, getCourse);
}
