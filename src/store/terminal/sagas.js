import { call, takeLeading, put } from 'redux-saga/effects';
import { compileCodeApi, checkAnswerApi } from '../api/terminal';
import {
  CLEAR_TERMINAL,
  COMPILE_CODE_REQUESTED,
  COMPILE_CODE_SUCCESSED,
  COMPILE_CODE_FAILED,
  CHECK_ANSWER_FAILED,
  CHECK_ANSWER_SUCCESSED,
  CHECK_ANSWER_REQUESTED
} from './actions';

export function* clearTerminal() {
  yield put({
    type: CLEAR_TERMINAL,
  });
}

export function* compileCode(action) {
  try {
    const response = yield call(compileCodeApi, action.payload);
    yield put({
      type: COMPILE_CODE_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: COMPILE_CODE_FAILED,
      payload: {
        message: e.message,
      },
    });
  }
}

export function* checkAnswer(action) {
  try {
    const response = yield call(checkAnswerApi, action.payload);
    yield put({
      type: CHECK_ANSWER_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: CHECK_ANSWER_FAILED,
      payload: {
        message: e.message,
      },
    });
  }
}

export default function* terminalSaga() {
  yield takeLeading(COMPILE_CODE_REQUESTED, compileCode);
  yield takeLeading(CHECK_ANSWER_REQUESTED, checkAnswer);
  yield takeLeading(CLEAR_TERMINAL, clearTerminal);
}
