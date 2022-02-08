export const COMPILE_CODE_REQUESTED = 'COMPILE_CODE_REQUESTED';
export const COMPILE_CODE_SUCCESSED = 'COMPILE_CODE_SUCCESSED';
export const COMPILE_CODE_FAILED = 'COMPILE_CODE_FAILED';

export const COMPILE_SHELL_REQUESTED = 'COMPILE_SHELL_REQUESTED';
export const COMPILE_SHELL_SUCCESSED = 'COMPILE_SHELL_SUCCESSED';
export const COMPILE_SHELL_FAILED = 'COMPILE_SHELL_FAILED';

export const CHECK_ANSWER_REQUESTED = 'CHECK_ANSWER_REQUESTED';
export const CHECK_ANSWER_SUCCESSED = 'CHECK_ANSWER_SUCCESSED';
export const CHECK_ANSWER_FAILED = 'CHECK_ANSWER_FAILED';

export const KERNEL_REQUESTED = 'KERNEL_REQUESTED';
export const KERNEL_SUCCESSED = 'KERNEL_SUCCESSED';
export const KERNEL_FAILED = 'KERNEL_FAILED';

export const CLEAR_TERMINAL = 'CLEAR_TERMINAL';
export const ADD_SHELL_LINE = 'ADD_SHELL_LINE';

export const compileCode = (code, exerciseId, isGraphRequired) => {
  return {
    type: COMPILE_CODE_REQUESTED,
    payload: { code, exerciseId, isGraphRequired },
  };
};

export const addShellLine = (code, lineNumber) => {
  return {
    type: ADD_SHELL_LINE,
    payload: { code, lineNumber },
  };
};

export const startKernel = (exerciseId) => {
  return {
    type: KERNEL_REQUESTED,
    payload: { exerciseId },
  };
};

export const compileShell = ({ code, exerciseId, lineNumber, kernelId, type }) => {
  return {
    type: COMPILE_SHELL_REQUESTED,
    payload: { code, exerciseId, lineNumber, kernelId, type },
  };
};

export const checkAnswer = (code, exerciseId, isGraphRequired) => {
  return {
    type: CHECK_ANSWER_REQUESTED,
    payload: { code, exerciseId, isGraphRequired },
  };
};

export const clearTerminal = () => {
  return {
    type: CLEAR_TERMINAL,
  };
};
