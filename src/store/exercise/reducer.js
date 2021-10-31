import { GET_EXERCISE } from "./actions";

const initialState = {};

export default function exerciseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXERCISE: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}