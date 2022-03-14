import { GET_PROGRESS_SUCCESSED, GET_PROGRESS_FAILED } from './actions';

const initialState = {};

export default function progressReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROGRESS_SUCCESSED: {
      return {
        ...action.payload.data,
      };
    }
    case GET_PROGRESS_FAILED: {
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
