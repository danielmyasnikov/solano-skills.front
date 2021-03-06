export const PATCH_PROFILE_REQUESTED = 'PATCH_PROFILE_REQUESTED';
export const PATCH_PROFILE_SUCCESSED = 'PATCH_PROFILE_SUCCESSED';
export const PATCH_PROFILE_FAILED = 'PATCH_PROFILE_FAILED';

export const GET_PROFILE_REQUESTED = 'GET_PROFILE_REQUESTED';
export const GET_PROFILE_SUCCESSED = 'GET_PROFILE_SUCCESSED';
export const GET_PROFILE_FAILED = 'GET_PROFILE_FAILED';

export const patchProfile = ({ name, about, email, avatar, headers }) => {
  return {
    type: PATCH_PROFILE_REQUESTED,
    payload: { name, about, email, avatar, headers },
  };
};

export const getProfile = () => {
  return {
    type: GET_PROFILE_REQUESTED,
    payload: {},
  };
};
