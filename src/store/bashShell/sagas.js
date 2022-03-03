import { call, takeLeading, put } from 'redux-saga/effects';
import { executeBashShellApi, startEnvironmentApi } from '../api/bashShell';
import {
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
  yield takeLeading(START_ENVIRONMENT_REQUESTED, startEnvironment);
}
