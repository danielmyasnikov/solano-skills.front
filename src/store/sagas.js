import {all, spawn} from 'redux-saga/effects';
import exerciseSaga from './exercise/sagas';
import terminalSaga from './terminal/sagas';

export default function* rootSaga() {
    const sagas = [terminalSaga, exerciseSaga];
    yield all(sagas.map(s => spawn(s)));
}