import { SEND_FEEDBACK_SUCCESSED } from './actions';

const initialState = {};

export default function feedbackReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_FEEDBACK_SUCCESSED: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
