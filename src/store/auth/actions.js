export const SING_IN = 'SING_IN';
export const REGISTRATION = 'REGISTRATION';

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
