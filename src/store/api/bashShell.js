import axios from 'axios';

export const startEnvironmentApi = () => {
  return axios
    .post(`${process.env.REACT_APP_API_TERMINAL}/console/v1/bash/startEnvironment`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const checkExerciseBashShellApi = ({ environmentId, exerciseId, userId, command }) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_TERMINAL}/console/v1/bash/checkExercise/${exerciseId}?environemtId=${environmentId}&userId=${userId}`,
      { command: command },
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const executeBashShellApi = ({ environmentId, command }) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_TERMINAL}/console/v1/bash/execute/${environmentId}?command=${command}`,
      {},
    )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
