import { call, takeLeading, put } from 'redux-saga/effects';
import {
  patchPasswordApi,
  registrationApi,
  requestPasswordResetApi,
  // signInByPhoneApi,
  // signInByPhoneVerifyApi,
  singInApi,
} from '../api/auth';

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
  REQUEST_PASSWORD_RESET_SUCCESSED,
  REQUEST_PASSWORD_RESET_FAILED,
  REQUEST_PASSWORD_RESET,
  PATCH_PASSWORD_SUCCESSED,
  PATCH_PASSWORD_FAILED,
  PATCH_PASSWORD,
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
    payload: payload,
  });
}

export function* singIn(action) {
  try {
    const res = yield call(singInApi, action.payload);
    const client = res.headers.client;
    const accessToken = res.headers['access-token'];
    const uid = res.headers.uid;

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

export function* signInByPhone(action) {
  try {
    // const res = yield call(signInByPhoneApi, action.payload);
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

export function* requestPasswordReset(action) {
  try {
    const res = yield call(requestPasswordResetApi, action.payload);
    yield put({
      type: REQUEST_PASSWORD_RESET_SUCCESSED,
      payload: {
        data: res,
      },
    });
  } catch (err) {
    const error = err.response.data.errors;
    yield put({
      type: REQUEST_PASSWORD_RESET_FAILED,
      payload: {
        error,
      },
    });
  }
}

export function* patchPassword(action) {
  try {
    const response = yield call(patchPasswordApi, action.payload);
    const { client, uid, expiry, 'access-token': accessToken } = response.headers;

    localStorage.setItem('uid', uid);
    localStorage.setItem('access-token', accessToken);
    localStorage.setItem('client', client);
    localStorage.setItem('expiry', expiry);

    const headers = { client, uid, 'access-token': accessToken };
    yield put({
      type: PATCH_PASSWORD_SUCCESSED,
      payload: {
        data: response.data,
        headers,
      },
    });
  } catch (e) {
    yield put({
      type: PATCH_PASSWORD_FAILED,
    });
  }
}

export function* signInByPhoneVerify(action) {
  try {
    // const res = yield call(signInByPhoneVerifyApi, action.payload);
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
    console.log(err.response);
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
    const client = res.headers.client;
    const accessToken = res.headers['access-token'];
    const uid = res.headers.uid;

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
    const emailError = err?.response?.data?.errors?.email;
    const passwordError = err?.response?.data?.errors?.password || '';
    const passwordConfirmationError = err?.response?.data?.errors?.password_confirmation || '';
    const fullMessagesError = err?.response?.data?.errors?.full_messages || '';
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
  yield takeLeading(REQUEST_PASSWORD_RESET, requestPasswordReset);
  yield takeLeading(PATCH_PASSWORD, patchPassword);
}
