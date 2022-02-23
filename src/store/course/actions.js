export const GET_COURSE_REQUESTED = 'GET_COURSE_REQUESTED';
export const GET_COURSE_SUCCESSED = 'GET_COURSE_SUCCESSED';
export const GET_COURSE_FAILED = 'GET_COURSE_FAILED';

export const getCourse = (courseId) => {
  return {
    type: GET_COURSE_REQUESTED,
    payload: { courseId },
  };
};
