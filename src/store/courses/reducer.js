import { LOAD_COURSES } from './actions';

const initialState = {
  coursesList: [],
};

// eslint-disable-next-line default-param-last
export default function coursesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COURSES: {
      return {
        ...state,
        coursesList: action.payload,
      };
    }
    default:
      return state;
  }
}
