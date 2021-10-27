export const GET_EXERCISE = 'GET_EXERCISE';

export const getExercise = (courseId, exerciseId) => {
  return {
    type: GET_EXERCISE,
    payload: { courseId, exerciseId },
  };
};
