import { call, takeLeading, put } from 'redux-saga/effects';
import { registrationApi, singInApi } from '../api/auth';

import {
  REGISTRATION_SUCCESSED,
  REGISTRATION_FAILED,
  SING_IN_SUCCESSED,
  SING_IN_FAILED,
  SING_IN,
  REGISTRATION,
  LOCAL_HEADERS,
  CLEAR_ERRORS,
  SIGN_IN_BY_PHONE,
  SIGN_IN_BY_PHONE_FAILED,
  SIGN_IN_BY_PHONE_SUCCESSED,
  SIGN_IN_BY_PHONE_VERIFY_SUCCESSED,
  SIGN_IN_BY_PHONE_VERIFY,
  SIGN_IN_BY_PHONE_VERIFY_FAILED,
} from './actions';

export function* setLocalHeaders({ payload }) {
  yield put({
    type: LOCAL_HEADERS,
    payload: payload.headers,
  });
}
export function* clearErrors(payload) {
  yield put({
    type: CLEAR_ERRORS,
    payload,
  });
}

export function* singIn(action) {
  try {
    const res = yield call(singInApi, action.payload);
    const { client } = res.headers;
    const accessToken = res.headers['access-token'];
    const { uid } = res.headers;

    localStorage.setItem('uid', uid);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('client', client);
    localStorage.setItem('expiry', res.headers.expiry);

    const headers = { client, uid, 'access-token': accessToken };
    yield put({
      type: SING_IN_SUCCESSED,
      payload: {
        headers,
      },
    });
  } catch (err) {
    const errorMassege = 'Не верные данные при авторизации';
    yield put({
      type: SING_IN_FAILED,
      payload: {
        errorMassege,
      },
    });
  }
}

export function* signInByPhone() {
  try {
    yield put({
      type: SIGN_IN_BY_PHONE_SUCCESSED,
      payload: {},
    });
  } catch (err) {
    const error = err.response.data.errors;
    yield put({
      type: SIGN_IN_BY_PHONE_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* signInByPhoneVerify() {
  try {
    // const client = res.headers.client;
    // const accessToken = res.headers['access-token'];
    // const uid = res.headers.uid;

    // localStorage.setItem('uid', uid);
    // localStorage.setItem('access-token', accessToken);
    // localStorage.setItem('client', client);
    // localStorage.setItem('expiry', res.headers.expiry);
    // const headers = { client, uid, 'access-token': accessToken };

    yield put({
      type: SIGN_IN_BY_PHONE_VERIFY_SUCCESSED,
      payload: {},
    });
  } catch (err) {
    const errorVerify = 'Неверный код';
    yield put({
      type: SIGN_IN_BY_PHONE_VERIFY_FAILED,
      payload: {
        errorVerify,
      },
    });
  }
}

export function* registration(action) {
  try {
    const res = yield call(registrationApi, action.payload);
    const { client } = res.headers;
    const accessToken = res.headers['access-token'];
    const { uid } = res.headers;

    localStorage.setItem('uid', uid);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('client', client);
    localStorage.setItem('expiry', res.headers.expiry);
    const headers = { client, uid, 'access-token': accessToken };

    yield put({
      type: REGISTRATION_SUCCESSED,
      payload: {
        headers,
      },
    });
  } catch (err) {
    const emailError = err.response.data.errors.email;
    const passwordError = err.response.data.errors.password || '';
    const passwordConfirmationError = err.response.data.errors.password_confirmation || '';
    const fullMessagesError = err.response.data.errors.full_messages || '';
    yield put({
      type: REGISTRATION_FAILED,
      payload: {
        emailError,
        passwordError,
        passwordConfirmationError,
        fullMessagesError,
      },
    });
  }
}

export default function* authSaga() {
  yield takeLeading(REGISTRATION, registration);
  yield takeLeading(SING_IN, singIn);
  yield takeLeading(SIGN_IN_BY_PHONE, signInByPhone);
  yield takeLeading(SIGN_IN_BY_PHONE_VERIFY, signInByPhoneVerify);
  yield takeLeading(LOCAL_HEADERS, setLocalHeaders);
}
