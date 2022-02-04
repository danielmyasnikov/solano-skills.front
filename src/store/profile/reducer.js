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
      console.log('red s', action.payload);
      return {
        ...action.payload.data,
      };
    }
    case GET_PROFILE_FAILED: {
      console.log('red f', action.payload);
      return {
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
