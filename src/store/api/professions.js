import axios from 'axios';

export const getProfessions = async ( headers ) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_COURSE}/api/v1/professions`, { headers });
    return response.data;
  } catch (err) {}
};

export const getProfession = async (pid, headers) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_COURSE}/api/v1/professions/${pid}`, { headers }
    );
    return response.data;
  } catch (err) {
    return { err }
  }
};