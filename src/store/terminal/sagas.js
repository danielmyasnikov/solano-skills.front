import { call, takeLeading, put } from 'redux-saga/effects';
import { compileCodeApi, checkAnswerApi, compileShellApi, startKernelApi } from '../api/terminal';
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
  KERNEL_REQUESTED,
  KERNEL_SUCCESSED,
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
    if (action.payload.type === 'compileExercise') {
      yield put({
        type: COMPILE_CODE_SUCCESSED,
        payload: {
          data: response,
        },
      });
    } else {
      yield put({
        type: COMPILE_SHELL_SUCCESSED,
        payload: {
          data: response,
          lineNumber: action.payload.lineNumber,
          code: action.payload.code,
        },
      });
    }
  } catch (e) {
    yield put({
      type: COMPILE_SHELL_FAILED,
      payload: {
        message: e.message,
      },
    });
  }
}

export function* startKernel(action) {
  try {
    const response = yield call(startKernelApi, action.payload);
    yield put({
      type: KERNEL_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    throw new Error(e);
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
  yield takeLeading(KERNEL_REQUESTED, startKernel);
  yield takeLeading(CLEAR_TERMINAL, clearTerminal);
}
