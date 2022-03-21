import axios from 'axios';

export const getTracksApi = ({ headers }) => {
  return axios
    .get(`${process.env.REACT_APP_API_COURSE}/api/v1/tracks`, {
      headers: headers,
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const addTracksApi = ({ tracks, headers }) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_COURSE}/api/v1/tracks`,
      {
        track_ids: tracks,
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

export const searchTracksApi = ({ value, headers }) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_COURSE}/api/v1/tracks/search`,
      {
        q: value,
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
