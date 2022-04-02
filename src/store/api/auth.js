import axios from 'axios';
import { env } from '@src/app/config';

export const registrationApi = ({ email, password, passwordConfirmation }) => {
  return axios
    .post(`${env.api.platform}/auth`, {
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
  return axios
    .post(`${env.api.platform}/auth/sign_in`, {
      email,
      password,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const requestPasswordResetApi = ({ email, configName }) => {
  return axios
    .post(`${env.api.platform}/auth/password`, {
      email: email,
      config_name: configName,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const patchPasswordApi = ({ resetPasswordToken, password, passwordConfirmation }) => {
  return axios
    .patch(`${env.api.platform}/auth/password`, {
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
  return axios
    .post(`${env.api.platform}/api/v1/verify_signature_code`, {
      code,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};
