import { PATCH_PROFILE_SUCCESSED, GET_PROFILE_SUCCESSED, GET_PROFILE_FAILED } from './actions';

const initialState = {};

export default function profileReducer(state = initialState, action) {
  switch (action.type) {
    case PATCH_PROFILE_SUCCESSED: {
      return {
        ...action.payload.data,
      };
    }
    case GET_PROFILE_SUCCESSED: {
      return {
        ...action.payload.data,
      };
    }
    case GET_PROFILE_FAILED: {
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
