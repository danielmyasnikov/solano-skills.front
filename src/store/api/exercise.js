import axios from 'axios';

export const getExerciseApi = ({ courseId, exerciseId, headers }) => {
  return axios
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
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
