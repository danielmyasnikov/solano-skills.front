import axios from 'axios';

export const courseApi = () => {
  return axios
    .get(`${process.env.REACT_APP_API_COURSE}/api/v1/courses`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
