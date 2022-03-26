import axios from 'axios';

export const getSkills = async ( headers ) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_COURSE}/api/v1/skills`, { headers });
    return response.data;
  } catch (err) {}
};

export const getSkill = async (sid, headers) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_COURSE}/api/v1/skills/${sid}`, { headers }
    );
    return response.data
  } catch (err) {
    return { err }
  }
};