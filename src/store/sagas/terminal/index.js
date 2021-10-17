import axios from "axios";
import { call, takeLeading, put } from "redux-saga/effects";
import { COMPILE_CODE } from "../../reducers/terminal/actions";

const pushCode = ({ code }) => {
  console.log(code)
  return axios
    .post(`http://84.201.187.101:8090/compile`, {
      code
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export function* compileCode({ payload }) {
  console.log(payload)
  const response = yield call(pushCode, payload);

  yield put({
    type: COMPILE_CODE,
    payload: response,
  });
}

export default function* terminalSaga() {
  yield takeLeading(COMPILE_CODE, compileCode);
}
