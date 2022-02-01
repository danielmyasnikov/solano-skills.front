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
