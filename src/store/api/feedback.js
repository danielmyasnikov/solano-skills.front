import api from '@src/http/api';

export const sendFeedbackApi = ({ description, feedbackType, phone, email, headers }) => {
  return api
    .post(
      `/api/v1/error_feedbacks`,
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
