

export const COMPILE_CODE_REQUESTED = 'COMPILE_CODE_REQUESTED';
export const COMPILE_CODE_SUCCESSED = 'COMPILE_CODE_SUCCESSED';
export const COMPILE_CODE_FAILED = 'COMPILE_CODE_FAILED';

export const CHECK_ANSWER_REQUESTED = 'CHECK_ANSWER_REQUESTED';
export const CHECK_ANSWER_SUCCESSED = 'CHECK_ANSWER_SUCCESSED';
export const CHECK_ANSWER_FAILED = 'CHECK_ANSWER_FAILED';

export const CLEAR_TERMINAL = 'CLEAR_TERMINAL';

export const compileCode = (code, exerciseId, isGraphRequired) => {
  return {
    type: COMPILE_CODE_REQUESTED,
    payload: { code, exerciseId, isGraphRequired },
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
