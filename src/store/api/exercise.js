import axios from 'axios';

export const getExerciseApi = ({ courseId, exerciseId }) => {
  return axios
    .get(`${API_COURSE}/api/v1/courses/${courseId}/exercises/${exerciseId}`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
