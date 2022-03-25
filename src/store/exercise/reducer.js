import { GET_EXERCISE_SUCCESSED, SEND_EXERCISE_SUCCESSED } from './actions';

const initialState = {};

export default function exerciseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXERCISE_SUCCESSED: {
      console.log(action.payload.data);
      return {
        ...state,
        ...action.payload.data,
      };
    }
    case SEND_EXERCISE_SUCCESSED: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
