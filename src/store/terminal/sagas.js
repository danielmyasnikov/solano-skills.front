import { call, takeLeading, put } from 'redux-saga/effects';
import { CLEAR_TERMINAL, COMPILE_CODE } from './actions';
import axios from 'axios';

const pushCode = (code) => {
  return axios
    .post(`http://84.201.152.65:8090/compile`, {
      code,
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export function* clearTerminal() {
  yield put({
    type: CLEAR_TERMINAL,
  });
}

export function* compileCode({ payload }) {
  const response = yield call(pushCode, payload);

  yield put({
    type: COMPILE_CODE,
    payload: response,
  });
}

export default function* terminalSaga() {
  yield takeLeading(COMPILE_CODE, compileCode);
  yield takeLeading(CLEAR_TERMINAL, clearTerminal);
}
