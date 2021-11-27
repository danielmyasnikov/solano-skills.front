import { all, spawn } from 'redux-saga/effects';
import exerciseSaga from './exercise/sagas';
import terminalSaga from './terminal/sagas';
import coursesSaga from './courses/sagas';
import courseSaga from './course/sagas';

export default function* rootSaga() {
  const sagas = [terminalSaga, exerciseSaga, coursesSaga, courseSaga];
  yield all(sagas.map((s) => spawn(s)));
}
