import {
  GET_EXERCISE_SUCCESSED,
  SEND_EXERCISE_SUCCESSED,
  SEND_VIDEO_EXERCISE_SUCCESSED,
} from './actions';

const initialState = {};

export default function exerciseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EXERCISE_SUCCESSED: {
      return {
        ...state,
        ...action.payload.data,
      };
    }
    case SEND_EXERCISE_SUCCESSED: {
      return {
        outputs: [...state.outputs],
      };
    }
    case SEND_VIDEO_EXERCISE_SUCCESSED: {
      return {
        outputs: [...state.outputs],
      };
    }
    default:
      return state;
  }
}
