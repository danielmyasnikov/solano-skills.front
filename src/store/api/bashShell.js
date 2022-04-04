import axios from 'axios';
import { env } from '@src/app/config/index.ts';

export const startEnvironmentApi = () => {
  return axios
    .post(`${env.api.terminal}/console/v1/bash/startEnvironment`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const checkExerciseBashShellApi = ({ environmentId, exerciseId, userId, command }) => {
  return axios
    .post(
      `${env.api.terminal}/console/v1/bash/checkExercise/${exerciseId}?environemtId=${environmentId}&userId=${userId}`,
      { command: command },
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const executeBashShellApi = ({ environmentId, command }) => {
  return axios
    .post(`${env.api.terminal}/console/v1/bash/execute/${environmentId}?command=${command}`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
