import { call, takeLeading, put } from 'redux-saga/effects';
import { compileCodeApi, checkAnswerApi, compileShellApi } from '../api/terminal';
import {
  CLEAR_TERMINAL,
  COMPILE_CODE_REQUESTED,
  COMPILE_CODE_SUCCESSED,
  COMPILE_CODE_FAILED,
  CHECK_ANSWER_FAILED,
  CHECK_ANSWER_SUCCESSED,
  CHECK_ANSWER_REQUESTED,
  COMPILE_SHELL_REQUESTED,
  COMPILE_SHELL_SUCCESSED,
  COMPILE_SHELL_FAILED,
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

export function* compileShell(action) {
  try {
    const response = yield call(compileShellApi, action.payload);
    yield put({
      type: COMPILE_SHELL_SUCCESSED,
      payload: {
        data: response,
        lineNumber: action.payload.lineNumber,
        code: action.payload.code,
      },
    });
  } catch (e) {
    yield put({
      type: COMPILE_SHELL_FAILED,
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
  yield takeLeading(COMPILE_SHELL_REQUESTED, compileShell);
  yield takeLeading(CHECK_ANSWER_REQUESTED, checkAnswer);
  yield takeLeading(CLEAR_TERMINAL, clearTerminal);
}
