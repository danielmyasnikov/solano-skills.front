import api from '@src/http/api';

export const PatchProfileApi = ({ name, about, email, avatar }) => {
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
    return api.patch(`/api/v1/profile`, formData).then((res) => res.data);
  } catch (e) {
    throw new Error(e);
  }
};

export const GetProfileApi = () => {
  try {
    return api.get(`/api/v1/me`).then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};
