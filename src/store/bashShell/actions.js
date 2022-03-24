export const START_ENVIRONMENT_REQUESTED = 'START_ENVIRONMENT_REQUESTED';
export const START_ENVIRONMENT_SUCCESSED = 'START_ENVIRONMENT_SUCCESSED';
export const START_ENVIRONMENT_FAILED = 'START_ENVIRONMENT_FAILED';

export const EXECUTE_BASH_SHELL_REQUESTED = 'EXECUTE_BASH_SHELL_REQUESTED';
export const EXECUTE_BASH_SHELL_SUCCESSED = 'EXECUTE_BASH_SHELL_SUCCESSED';
export const EXECUTE_BASH_SHELL_FAILED = 'EXECUTE_BASH_SHELL_FAILED';

export const CHECK_EXERCISE_BASH_SHELL_REQUESTED = 'CHECK_EXERCISE_BASH_SHELL_REQUESTED';
export const CHECK_EXERCISE_BASH_SHELL_SUCCESSED = 'CHECK_EXERCISE_BASH_SHELL_SUCCESSED';
export const CHECK_EXERCISE_BASH_SHELL_FAILED = 'CHECK_EXERCISE_BASH_SHELL_FAILED';

export const CLEAR_BASH_SHELL = 'CLEAR_BASH_SHELL';

export const executeBashShell = ({ environmentId, command }) => {
  return {
    type: EXECUTE_BASH_SHELL_REQUESTED,
    payload: { environmentId, command },
  };
};

export const checkExerciseBashShell = ({ environmentId, exerciseId, userId, command }) => {
  return {
    type: CHECK_EXERCISE_BASH_SHELL_REQUESTED,
    payload: { environmentId, exerciseId, userId, command },
  };
};

export const startEnvironment = () => {
  return {
    type: START_ENVIRONMENT_REQUESTED,
    payload: {},
  };
};

export const clearBashShell = () => {
  return {
    type: CLEAR_BASH_SHELL,
  };
};
