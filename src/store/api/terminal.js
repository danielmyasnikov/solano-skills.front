import axios from 'axios';

export const compileCodeApi = ({ code, exerciseId, isGraphRequired }) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_TERMINAL}/executeWithExercise/${exerciseId}?isGraphRequired=${isGraphRequired}`,
      {
        code,
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const startKernelApi = ({ exerciseId }) => {
  return axios
    .post(`${process.env.REACT_APP_API_TERMINAL}/shell/startKernel/${exerciseId}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const compileShellApi = ({ code, kernelId, exerciseId, isGraphRequired }) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_TERMINAL}/shell/execute/${kernelId}?exerciseId=${exerciseId}&isGraphRequired=${isGraphRequired}`,
      {
        code,
        exerciseId,
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const checkAnswerApi = ({ code, exerciseId, isGraphRequired, xp, userId }) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_TERMINAL}/checkExercise/${exerciseId}?isGraphRequired=${isGraphRequired}&xp=${xp}&userId=${userId}`,
      {
        code,
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
