import api from '@src/http/api';

export const registrationApi = ({ email, password, passwordConfirmation }) => {
  return api
    .post(`/auth`, {
      email,
      password,
      password_confirmation: passwordConfirmation,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const singInApi = ({ email, password }) => {
  return api
    .post(`/auth/sign_in`, {
      email,
      password,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const requestPasswordResetApi = ({ email, configName }) => {
  return api
    .post(`/auth/password`, {
      email: email,
      config_name: configName,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const patchPasswordApi = ({ resetPasswordToken, password, passwordConfirmation }) => {
  return api
    .patch(`/auth/password`, {
      reset_password_token: resetPasswordToken,
      password,
      password_confirmation: passwordConfirmation,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const signInByPhoneVerifyApi = ({ code }) => {
  return api
    .post(`/api/v1/verify_signature_code`, {
      code,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};
