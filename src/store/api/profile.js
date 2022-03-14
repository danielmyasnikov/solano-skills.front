import axios from 'axios';

export const PatchProfileApi = ({ name, about, email, avatar, headers }) => {
  const formData = new FormData();

  if (name) {
    formData.append('name', name);
  }
  if (about) {
    formData.append('about', about);
  }
  if (email) {
    formData.append('email', email);
  }
  if (avatar) {
    formData.append('avatar', avatar);
  }
  try {
    return axios({
      method: 'PATCH',
      url: `${process.env.REACT_APP_API_COURSE}/api/v1/profile`,
      headers,
      data: formData,
    }).then((res) => res.data);
  } catch (e) {
    throw new Error(e);
  }
};

export const GetProfileApi = ({ headers }) => {
  try {
    return axios
      .get(`${process.env.REACT_APP_API_COURSE}/api/v1/me`, { headers })
      .then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};
