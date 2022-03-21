import { call, takeLeading, put } from 'redux-saga/effects';
import { addTracksApi, getTracksApi, searchTracksApi } from '../api/onBoard';
import {
  GET_TRACKS_REQUESTED,
  GET_TRACKS_SUCCESSED,
  GET_TRACKS_FAILED,
  ADD_TRACKS_SUCCESSED,
  ADD_TRACKS_FAILED,
  ADD_TRACKS_REQUESTED,
  SEARCH_TRACKS_SUCCESSED,
  SEARCH_TRACKS_FAILED,
  SEARCH_TRACKS_REQUESTED,
} from './actions';

export function* getTracks(action) {
  try {
    const response = yield call(getTracksApi, action.payload);
    yield put({
      type: GET_TRACKS_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: GET_TRACKS_FAILED,
    });
  }
}

export function* addTracks(action) {
  try {
    const response = yield call(addTracksApi, action.payload, { method: 'POST' });
    yield put({
      type: ADD_TRACKS_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: ADD_TRACKS_FAILED,
      payload: {
        message: e.message,
      },
    });
  }
}

export function* searchTracks(action) {
  try {
    const response = yield call(searchTracksApi, action.payload, { method: 'POST' });
    yield put({
      type: SEARCH_TRACKS_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: SEARCH_TRACKS_FAILED,
      payload: {
        message: e.message,
      },
    });
  }
}

export default function* onBoardSaga() {
  yield takeLeading(GET_TRACKS_REQUESTED, getTracks);
  yield takeLeading(ADD_TRACKS_REQUESTED, addTracks);
  yield takeLeading(SEARCH_TRACKS_REQUESTED, searchTracks);
}
