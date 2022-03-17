export const SEND_FEEDBACK_REQUESTED = 'SEND_FEEDBACK_REQUESTED';
export const SEND_FEEDBACK_SUCCESSED = 'SEND_FEEDBACK_SUCCESSED';
export const SEND_FEEDBACK_FAILED = 'SEND_FEEDBACK_SUCCESSED';

export const sendFeedback = (description, feedbackType, phone, email, headers) => {
  return {
    type: SEND_FEEDBACK_REQUESTED,
    payload: { description, feedbackType, phone, email, headers },
  };
};
