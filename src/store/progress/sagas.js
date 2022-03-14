import { call, takeLeading, put } from 'redux-saga/effects';
import { GetPRogressApi } from '../api/progress';
import { GET_PROGRESS_REQUESTED, GET_PROGRESS_SUCCESSED, GET_PROGRESS_FAILED } from './actions';

export function* getProgress(action) {
  try {
    const response = yield call(GetPRogressApi, action.payload);
    yield put({
      type: GET_PROGRESS_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: GET_PROGRESS_FAILED,
    });
  }
}

export default function* progressSaga() {
  yield takeLeading(GET_PROGRESS_REQUESTED, getProgress);
}
