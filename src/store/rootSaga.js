import {all, spawn} from 'redux-saga/effects';
import terminalSaga from './terminal';

export default function* rootSaga() {
    const sagas = [terminalSaga];
    yield all(sagas.map(s => spawn(s)));
}