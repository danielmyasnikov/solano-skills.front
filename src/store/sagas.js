import { all, spawn } from 'redux-saga/effects';
import terminalSaga from './terminal/sagas';
import coursesSaga from './courses/sagas';
import courseSaga from './course/sagas';
import profileSaga from './profile/sagas';

import authSaga from './auth/sagas';
import bashShellSaga from './bashShell/sagas';
import tariffsSaga from './tariffs/sagas';
import progressSaga from './progress/sagas';
import feedbackSaga from './feedback/sagas';
import onBoardSaga from './onBoard/sagas';

export default function* rootSaga() {
  const sagas = [
    terminalSaga,
    coursesSaga,
    courseSaga,
    authSaga,
    profileSaga,
    bashShellSaga,
    tariffsSaga,
    progressSaga,
    feedbackSaga,
    onBoardSaga,
  ];
  yield all(sagas.map((s) => spawn(s)));
}
