export const GET_PROGRESS_REQUESTED = 'GET_PROGRESS_REQUESTED';
export const GET_PROGRESS_SUCCESSED = 'GET_PROGRESS_SUCCESSED';
export const GET_PROGRESS_FAILED = 'GET_PROGRESS_FAILED';

export const getProgress = ({ headers }) => {
  return {
    type: GET_PROGRESS_REQUESTED,
    payload: { headers },
  };
};
