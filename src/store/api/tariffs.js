import axios from 'axios';

export const getTariffsApi = () => {
  return axios
    .get(`${process.env.REACT_APP_API_COURSE}/api/v1/tariffs`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
