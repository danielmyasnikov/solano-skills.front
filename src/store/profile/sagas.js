import { call, takeLeading, put } from 'redux-saga/effects';
import { GetProfileApi, PatchProfileApi } from '../api/profile';
import {
  PATCH_PROFILE_REQUESTED,
  PATCH_PROFILE_SUCCESSED,
  PATCH_PROFILE_FAILED,
  GET_PROFILE_FAILED,
  GET_PROFILE_SUCCESSED,
  GET_PROFILE_REQUESTED,
} from './actions';

export function* patchProfile(action) {
  try {
    const response = yield call(PatchProfileApi, action.payload);
    yield put({
      type: PATCH_PROFILE_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: PATCH_PROFILE_FAILED,
    });
  }
}

export function* getProfile(action) {
  console.log('saga', action);
  try {
    const response = yield call(GetProfileApi, action.payload);
    yield put({
      type: GET_PROFILE_SUCCESSED,
      payload: {
        data: response,
      },
    });
  } catch (e) {
    yield put({
      type: GET_PROFILE_FAILED,
    });
  }
}

export default function* profileSaga() {
  yield takeLeading(PATCH_PROFILE_REQUESTED, patchProfile);
  yield takeLeading(GET_PROFILE_REQUESTED, getProfile);
}
