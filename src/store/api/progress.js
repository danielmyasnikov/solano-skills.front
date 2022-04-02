import axios from 'axios';
import { env } from '@src/app/config';

export const GetPRogressApi = ({ headers }) => {
  try {
    return axios
      .get(`${env.api.platform}/api/v1/progress`, { headers: headers })
      .then((res) => res.data);
  } catch (e) {
    console.log(e);
  }
};
