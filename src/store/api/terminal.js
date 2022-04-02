import axios from 'axios';
import { env } from '@src/app/config/index.ts';

export const compileCodeApi = ({ code, exerciseId, isGraphRequired }) => {
  return axios
    .post(
      `${env.api.terminal}/executeWithExercise/${exerciseId}?isGraphRequired=${isGraphRequired}`,
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
    .post(`${env.api.terminal}/shell/startKernel/${exerciseId}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const compileShellApi = ({ code, kernelId, exerciseId, isGraphRequired }) => {
  return axios
    .post(
      `${env.api.terminal}/shell/execute/${kernelId}?exerciseId=${exerciseId}&isGraphRequired=${isGraphRequired}`,
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
      `${env.api.terminal}/checkExercise/${exerciseId}?isGraphRequired=${isGraphRequired}&xp=${xp}&userId=${userId}`,
      {
        code,
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
