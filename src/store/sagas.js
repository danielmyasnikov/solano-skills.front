import { all, spawn } from 'redux-saga/effects';
import exerciseSaga from './exercise/sagas';
import terminalSaga from './terminal/sagas';
import coursesSaga from './courses/sagas';

export default function* rootSaga() {
  const sagas = [terminalSaga, exerciseSaga, coursesSaga];
  yield all(sagas.map((s) => spawn(s)));
}
