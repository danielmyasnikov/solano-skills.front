import { PATCH_PROFILE_SUCCESSED, GET_PROFILE_SUCCESSED, GET_PROFILE_FAILED } from './actions';

const initialState = {
  isAuth: false,
};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PATCH_PROFILE_SUCCESSED: {
      return {
        isAuth: true,
        ...action.payload.data,
      };
    }
    case GET_PROFILE_SUCCESSED: {
      return {
        isAuth: true,
        ...action.payload.data,
      };
    }
    case GET_PROFILE_FAILED: {
      return {
        isAuth: false,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
