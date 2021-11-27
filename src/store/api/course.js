import axios from 'axios';

export const getCourseApi = ({ courseId }) => {
  return axios
    .get(`${process.env.REACT_APP_API_COURSE}/api/v1/courses/${courseId}`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
