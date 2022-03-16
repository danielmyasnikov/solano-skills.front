export const GET_TARIFFS_REQUESTED = 'GET_TARIFFS_REQUESTED';
export const GET_TARIFFS_SUCCESSED = 'GET_TARIFFS_SUCCESSED';
export const GET_TARIFFS_FAILED = 'GET_TARIFFS_FAILED';

export const getTariffs = () => {
  return {
    type: GET_TARIFFS_REQUESTED,
  };
};
