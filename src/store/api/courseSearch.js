import axios from 'axios';

export const getCourseSearchApi = ({ search }) =>
  axios
    .get(`${process.env.REACT_APP_API_COURSE}/api/v1/search/${search}`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
