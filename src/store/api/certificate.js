import axios from 'axios';

// const client = localStorage.getItem('client');
// const accessToken = localStorage.getItem('access-token');
// const uid = localStorage.getItem('uid');

export const getCertificates = async ( headers ) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_COURSE}/api/v1/certificates`, { headers });
    return response.data;
  } catch (err) {}
};

export const getCertificate = async (cid, headers) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_COURSE}/api/v1/certificates/${cid}`,
      {
        html: '<h1>hello</h1>',
        force: 'true',
      },
      { headers }
    );
    return response;
  } catch (err) {
    return { error: 404 }
  }
};
