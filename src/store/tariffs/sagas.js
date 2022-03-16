import { call, takeLeading, put } from 'redux-saga/effects';
import { getTariffsApi } from '../api/tariffs';
import { GET_TARIFFS_SUCCESSED, GET_TARIFFS_FAILED, GET_TARIFFS_REQUESTED } from './actions';

export function* getTariffs(action) {
  try {
    const response = yield call(getTariffsApi, action.payload);
    yield put({
      type: GET_TARIFFS_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: GET_TARIFFS_FAILED,
    });
  }
}

export default function* tariffsSaga() {
  yield takeLeading(GET_TARIFFS_REQUESTED, getTariffs);
}
