import axios from 'axios';

export const compileCodeApi = ({ code, exerciseId }) => {
  return axios
    .post(`${process.env.REACT_APP_API_TERMINAL}/executeWithExercise/${exerciseId}`, {
      code,
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const checkAnswerApi = ({ code, exerciseId }) => {
  return axios
    .post(`${process.env.REACT_APP_API_TERMINAL}/checkExercise/${exerciseId}?isGraphRequired=false&userId=2`, {
      code,
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
