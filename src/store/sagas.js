import { all, spawn } from 'redux-saga/effects';
import profileSaga from './profile/sagas';

import authSaga from './auth/sagas';
import terminalSaga from '@src/features/exercises/terminal/sagas';
import bashShellSaga from '@src/features/exercises/bash/sagas';
import progressSaga from './progress/sagas';
import feedbackSaga from './feedback/sagas';

export default function* rootSaga() {
  const sagas = [terminalSaga, authSaga, profileSaga, bashShellSaga, progressSaga, feedbackSaga];
  yield all(sagas.map((s) => spawn(s)));
}
