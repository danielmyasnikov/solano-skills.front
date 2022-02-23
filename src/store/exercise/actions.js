export const GET_EXERCISE_REQUESTED = 'GET_EXERCISE_REQUESTED';
export const GET_EXERCISE_SUCCESSED = 'GET_EXERCISE_SUCCESSED';
export const GET_EXERCISE_FAILED = 'GET_EXERCISE_FAILED';

export const getExercise = (courseId, exerciseId) => {
  return {
    type: GET_EXERCISE_REQUESTED,
    payload: { courseId, exerciseId },
  };
};
