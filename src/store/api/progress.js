import api from '@src/http/api';

export const GetPRogressApi = () => {
  try {
    return api.get(`/api/v1/progress`).then((res) => res.data);
  } catch (e) {
    console.error(e);
  }
};
