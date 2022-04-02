import axios from 'axios';
import { env } from '@src/app/config';

export const sendFeedbackApi = ({ description, feedbackType, phone, email, headers }) => {
  return axios
    .post(
      `${env.api.platform}/api/v1/error_feedbacks`,
      {
        description,
        feedback_type: feedbackType,
        phone,
        email,
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
