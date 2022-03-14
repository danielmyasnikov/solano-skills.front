import { all, spawn } from 'redux-saga/effects';
import exerciseSaga from './exercise/sagas';
import terminalSaga from './terminal/sagas';
import coursesSaga from './courses/sagas';
import courseSaga from './course/sagas';
import profileSaga from './profile/sagas';

import authSaga from './auth/sagas';
import bashShellSaga from './bashShell/sagas';
import progressSaga from './progress/sagas';

export default function* rootSaga() {
  const sagas = [
    terminalSaga,
    exerciseSaga,
    coursesSaga,
    courseSaga,
    authSaga,
    profileSaga,
    bashShellSaga,
    progressSaga,
  ];
  yield all(sagas.map((s) => spawn(s)));
}
