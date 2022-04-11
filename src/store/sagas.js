import { all, spawn } from 'redux-saga/effects';
import profileSaga from './profile/sagas';

import authSaga from './auth/sagas';
import progressSaga from './progress/sagas';
import feedbackSaga from './feedback/sagas';

export default function* rootSaga() {
  const sagas = [authSaga, profileSaga, progressSaga, feedbackSaga];
  yield all(sagas.map((s) => spawn(s)));
}
