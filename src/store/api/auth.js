import axios from 'axios';

export const registrationApi = ({ email, password, passwordConfirmation }) => {
  return axios
    .post(`${process.env.REACT_APP_API_COURSE}/auth`, {
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
    .post(`${process.env.REACT_APP_API_COURSE}/auth/sign_in`, {
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
    .post(`${process.env.REACT_APP_API_COURSE}/auth/password`, {
      email: email,
      config_name: configName,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const signInByPhoneApi = ({ phonenumber }) => {
  return axios
    .get(`${process.env.REACT_APP_API_COURSE}/api/v1/request_signature_code`, {
      phone_number: phonenumber,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};

export const signInByPhoneVerifyApi = ({ code }) => {
  return axios
    .post(`${process.env.REACT_APP_API_COURSE}/api/v1/verify_signature_code`, {
      code,
    })
    .then((res) => res)
    .catch((error) => {
      throw error;
    });
};
