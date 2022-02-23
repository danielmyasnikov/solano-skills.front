import { GET_COURSE_SUCCESSED } from './actions';

const initialState = {};

// eslint-disable-next-line default-param-last
export default function courseReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COURSE_SUCCESSED: {
      return {
        ...action.payload.data,
      };
    }
    default:
      return state;
  }
}
