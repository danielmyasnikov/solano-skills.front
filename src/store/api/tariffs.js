import axios from 'axios';

export const getTariffsApi = () => {
  return axios
    .get(`${process.env.REACT_APP_API_COURSE}/api/v1/plans`, {})
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
