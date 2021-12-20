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

// res:
// data:
// allow_password_change: false
// created_at: "2021-11-24T19:42:27.252Z"
// email: "test4@mail.ru"
// id: 6
// provider: "email"
// uid: "test4@mail.ru"
// updated_at: "2021-11-24T19:42:27.397Z"
// [[Prototype]]: Object
// status: "success"
// [[Prototype]]: Object
// [[Prototype]]: Object