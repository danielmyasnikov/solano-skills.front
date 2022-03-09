export const GET_EXERCISE_REQUESTED = 'GET_EXERCISE_REQUESTED';
export const GET_EXERCISE_SUCCESSED = 'GET_EXERCISE_SUCCESSED';
export const GET_EXERCISE_FAILED = 'GET_EXERCISE_FAILED';

export const SEND_EXERCISE_REQUESTED = 'SEND_EXERCISE_REQUESTED';
export const SEND_EXERCISE_SUCCESSED = 'SEND_EXERCISE_SUCCESSED';
export const SEND_EXERCISE_FAILED = 'SEND_EXERCISE_SUCCESSED';

export const SEND_VIDEO_EXERCISE_REQUESTED = 'SEND_VIDEO_EXERCISE_REQUESTED';
export const SEND_VIDEO_EXERCISE_SUCCESSED = 'SEND_VIDEO_EXERCISE_SUCCESSED';
export const SEND_VIDEO_EXERCISE_FAILED = 'SEND_VIDEO_EXERCISE_FAILED';

export const getExercise = (courseId, exerciseId, headers) => {
  return {
    type: GET_EXERCISE_REQUESTED,
    payload: { courseId, exerciseId, headers },
  };
};

export const sendAnswer = (exerciseId, courseId, xp, headers) => {
  return {
    type: SEND_EXERCISE_REQUESTED,
    payload: { exerciseId, courseId, xp, headers },
  };
};
