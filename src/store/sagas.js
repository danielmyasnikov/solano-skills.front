import { all, spawn } from 'redux-saga/effects';
import terminalSaga from './terminal/sagas';
import profileSaga from './profile/sagas';

import authSaga from './auth/sagas';
import bashShellSaga from './bashShell/sagas';
import progressSaga from './progress/sagas';
import feedbackSaga from './feedback/sagas';

export default function* rootSaga() {
  const sagas = [terminalSaga, authSaga, profileSaga, bashShellSaga, progressSaga, feedbackSaga];
  yield all(sagas.map((s) => spawn(s)));
}
