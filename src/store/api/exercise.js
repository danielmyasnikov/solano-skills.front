import axios from 'axios';

export const getExerciseApi = ({ courseId, exerciseId, headers }) => {
  return axios
    .get(`${process.env.REACT_APP_API_COURSE}/api/v1/courses/${courseId}/exercises/${exerciseId}`, {
      headers,
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const sendAnswerApi = ({ exerciseId, answerId, xp }) => {
  return axios
    .post(`${process.env.REACT_APP_API_COURSE}/api/v1/exercises/${exerciseId}/answer`, {
      answerId,
      xp,
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const sendXpByVideoApi = ({ exerciseId, xp }) => {
  return axios
    .post(`${process.env.REACT_APP_API_COURSE}/api/v1/exercises/${exerciseId}/xp`, {
      xp,
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
