import axios from 'axios';

const client = localStorage.getItem('client');
const accessToken = localStorage.getItem('access-token');
const uid = localStorage.getItem('uid');

export const getCertificates = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_COURSE}/api/v1/certificates`, {
      headers: {
        client: client,
        'access-token': accessToken,
        uid: uid,
      },
    });
    if (response.status === 200) {
      return response.data.certificates;
    }
    return [];
  } catch (err) {}
};

export const getCertificate = async (cid) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_COURSE}/api/v1/certificates/${cid}`,
      {
        html: '<h1>hello</h1>',
        force: 'true',
      },
      {
        headers: {
          client: client,
          'access-token': accessToken,
          uid: uid,
        },
      },
    );
    if (response.status === 200) {
      return response.data.url;
    }
    return false;
  } catch (err) {}
};
