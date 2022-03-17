import axios from 'axios';

export const sendFeedbackApi = ({ description, feedbackType, phone, email, headers }) => {
  return axios
    .post(
      `${process.env.REACT_APP_API_COURSE}/api/v1/error_feedbacks`,
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
