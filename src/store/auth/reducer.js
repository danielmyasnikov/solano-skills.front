import {
  REGISTRATION_SUCCESSED,
  REGISTRATION_FAILED,
  SING_IN_SUCCESSED,
  LOCAL_HEADERS,
  SING_IN_FAILED,
  CLEAR_ERRORS,
} from './actions';

const initialState = {
  headers: {},
  errors: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_SUCCESSED: {
      return { ...state, headers: action.payload.headers };
    }
    case SING_IN_SUCCESSED: {
      return { ...state, headers: action.payload.headers };
    }
    case LOCAL_HEADERS: {
      return { ...state, headers: action.payload.headers };
    }
    case REGISTRATION_FAILED: {
      return { ...state, errors: action.payload };
    }
    case SING_IN_FAILED: {
      return { ...state, errors: action.payload };
    }
    case CLEAR_ERRORS: {
      return { ...state, errors: { ...state.errors, ...action.payload } };
    }
    default:
      return state;
  }
}
