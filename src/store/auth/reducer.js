import {
  REGISTRATION_SUCCESSED,
  REGISTRATION_FAILED,
  SING_IN_SUCCESSED,
  LOCAL_HEADERS,
  SING_IN_FAILED,
  CLEAR_ERRORS,
  SIGN_IN_BY_PHONE_FAILED,
  SIGN_IN_BY_PHONE_VERIFY_FAILED,
  SIGN_IN_BY_PHONE_SUCCESSED,
  SIGN_IN_BY_PHONE_VERIFY,
} from './actions';

const initialState = {
  headers: {},
  errors: {},
};

export default function authReducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    case REGISTRATION_SUCCESSED: {
      return { ...state, headers: action.payload.headers };
    }
    case SING_IN_SUCCESSED: {
      return { ...state, headers: action.payload.headers };
    }
    case LOCAL_HEADERS: {
      return { ...state, headers: action.payload };
    }
    case REGISTRATION_FAILED: {
      return { ...state, errors: action.payload };
    }
    case SIGN_IN_BY_PHONE_SUCCESSED: {
      return {...state, errors: {}}
    }
    case SIGN_IN_BY_PHONE_VERIFY_FAILED: {
      return {...state, errors: { ...state.errors, ...action.payload }}
    }
    case SIGN_IN_BY_PHONE_VERIFY: {
      return {...state, errors: {}}
    }
    case SING_IN_FAILED: {
      return { ...state, errors: action.payload };
    }
    case SIGN_IN_BY_PHONE_FAILED: {
      return { ...state, errors: { ...action.payload } };
    }
    case CLEAR_ERRORS: {
      return { ...state, errors: { ...state.errors, ...action.payload } };
    }
    default:
      return state;
  }
}
