import { LOAD_COURSES } from './actions';

const initialState = {
  coursesList: [],
};

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
