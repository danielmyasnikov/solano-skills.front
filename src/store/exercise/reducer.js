import { GET_EXERCISE_SUCCESSED } from "./actions";

const initialState = {};

export default function exerciseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXERCISE_SUCCESSED: {
      return {
        ...state,
        ...action.payload.data
      };
    }
    default:
      return state;
  }
}