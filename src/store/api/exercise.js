import axios from 'axios';

export const getExerciseApi = ({ courseId, exerciseId, headers }) => {
  return axios
<<<<<<< HEAD
    .get(
      `${process.env.REACT_APP_API_COURSE}/api/v1/courses/${courseId}/exercises/${exerciseId}`,
      {},
    )
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
=======
    .get(`${process.env.REACT_APP_API_COURSE}/api/v1/courses/${courseId}/exercises/${exerciseId}`, {
      headers: headers,
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const sendAnswerApi = ({ exerciseId, courseId, xp, headers }) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_COURSE}/api/v1/courses/${courseId}/exercises/${exerciseId}/answers`,
      {
        xp,
      },
      {
        headers: headers,
      },
    )
>>>>>>> master
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
