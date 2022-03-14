import axios from 'axios';

export const GetPRogressApi = ({ headers }) => {
  try {
    return axios
      .get(`${process.env.REACT_APP_API_COURSE}/api/v1/progress`, { headers: headers })
      .then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};
