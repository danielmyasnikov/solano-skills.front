import axios from 'axios';

export const PatchProfileApi = ({ name, about, email, headers }) => {
  try {
    return axios
      .patch(
        `${process.env.REACT_APP_API_COURSE}/api/v1/profile`,
        {
          name,
          about,
          email,
        },
        { headers: headers },
      )
      .then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};

export const GetProfileApi = ({ headers }) => {
  try {
    return axios
      .get(`${process.env.REACT_APP_API_COURSE}/api/v1/me`, { headers: headers })
      .then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};
