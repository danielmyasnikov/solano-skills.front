export const SING_IN = 'SING_IN';
export const REGISTRATION = 'REGISTRATION';
export const SIGN_IN_BY_PHONE = 'SING_IN_BY_PHONE';
export const SIGN_IN_BY_PHONE_VERIFY = 'SIGN_IN_BY_PHONE_VERIFY';

export const SIGN_IN_BY_PHONE_FAILED = 'SIGN_IN_BY_PHONE_FAILED';
export const SIGN_IN_BY_PHONE_SUCCESSED = 'SIGN_IN_BY_PHONE_SUCCESSED';

export const SIGN_IN_BY_PHONE_VERIFY_FAILED = 'SIGN_IN_BY_PHONE_VERIFY_FAILED';
export const SIGN_IN_BY_PHONE_VERIFY_SUCCESSED = 'SIGN_IN_BY_PHONE_VERIFY_SUCCESSED';

export const REGISTRATION_SUCCESSED = 'REGISTRATION_SUCCESSED';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const SING_IN_SUCCESSED = 'SING_IN_SUCCESSED';
export const SING_IN_FAILED = 'SING_IN_FAILED';

export const LOCAL_HEADERS = 'LOCAL_HEADERS';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

export const singIn = (email, password) => {
  return {
    type: SING_IN,
    payload: { email, password },
  };
};

export const signInByPhoneRequest = (phonenumber) => {
  return {
    type: SIGN_IN_BY_PHONE,
    payload: { phonenumber },
  };
};

export const signInByPhoneVerify = (code) => {
  return {
    type: SIGN_IN_BY_PHONE_VERIFY,
    payload: { code },
  };
};

export const registration = (email, password, passwordConfirm) => {
  return {
    type: REGISTRATION,
    payload: { email, password, passwordConfirm },
  };
};

export const setLocalHeaders = (headers) => {
  return {
    type: LOCAL_HEADERS,
    payload: { headers },
  };
};

export const clearErrors = (payload) => {
  return {
    type: CLEAR_ERRORS,
    payload,
  };
};
