import { call, takeLeading, put } from 'redux-saga/effects';
import {
  executeBashShellApi,
  startEnvironmentApi,
  checkExerciseBashShellApi,
} from '@store/api/bashShell';
import {
  CHECK_EXERCISE_BASH_SHELL_REQUESTED,
  CHECK_EXERCISE_BASH_SHELL_SUCCESSED,
  CLEAR_BASH_SHELL,
  EXECUTE_BASH_SHELL_REQUESTED,
  EXECUTE_BASH_SHELL_SUCCESSED,
  START_ENVIRONMENT_REQUESTED,
  START_ENVIRONMENT_SUCCESSED,
} from './actions';

export function* executeBashShell(action) {
  try {
    const response = yield call(executeBashShellApi, action.payload);
    yield put({
      type: EXECUTE_BASH_SHELL_SUCCESSED,
      payload: {
        data: response,
        command: action.payload.command,
      },
    });
  } catch (e) {}
}

export function* checkExerciseBashShell(action) {
  try {
    const response = yield call(checkExerciseBashShellApi, action.payload);
    yield put({
      type: CHECK_EXERCISE_BASH_SHELL_SUCCESSED,
      payload: {
        data: response,
        command: action.payload.command,
      },
    });
  } catch (e) {}
}
export function* clearBashShell() {
  try {
    yield put({
      type: CLEAR_BASH_SHELL,
      payload: {},
    });
  } catch (e) {}
}

export function* startEnvironment(action) {
  try {
    const response = yield call(startEnvironmentApi, action.payload);
    yield put({
      type: START_ENVIRONMENT_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {}
}

export default function* bashShellSaga() {
  yield takeLeading(EXECUTE_BASH_SHELL_REQUESTED, executeBashShell);
  yield takeLeading(CHECK_EXERCISE_BASH_SHELL_REQUESTED, checkExerciseBashShell);
  yield takeLeading(START_ENVIRONMENT_REQUESTED, startEnvironment);
  yield takeLeading(CLEAR_BASH_SHELL, clearBashShell);
}
