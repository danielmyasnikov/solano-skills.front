import { call, takeLeading, put } from 'redux-saga/effects';
import { CLEAR_TERMINAL, COMPILE_CODE } from './actions';
import axios from 'axios';

const compileCodeApi = (code) => {
  return axios
    .post(`${process.env.REACT_APP_API_TERMINAL}/compile`, {
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
  const response = yield call(compileCodeApi, payload);

  yield put({
    type: COMPILE_CODE,
    payload: response,
  });
}

export default function* terminalSaga() {
  yield takeLeading(COMPILE_CODE, compileCode);
  yield takeLeading(CLEAR_TERMINAL, clearTerminal);
}
