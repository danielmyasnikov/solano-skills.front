import axios from 'axios';

export const getCertificate = ({ data }) => {
  const headers = {
    'client': 'kmWSHKf30ScUGK_KgWgm-A',
    'access-token': 'mF0uARsv8qug8EPfRwiBrw',
    'uid': 'daniel.g.myasnikov+cert+1@gmail.com',
  }
  
  return axios
    .post(`${process.env.REACT_APP_API_COURSE}/api/v1/courses/functions-in-python/certificates`, {
      "html": "<h1>hello</h1>",
      "force": "true",
    }, { headers })
    .then(res => res.data.file_url)
    .catch(error => {
      throw error;
    });
};
