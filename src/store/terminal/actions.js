export const COMPILE_CODE = 'COMPILE_CODE';
export const CLEAR_TERMINAL = 'CLEAR_TERMINAL'

export const compileCode = (code) => {
  return {
    type: COMPILE_CODE,
    payload: code,
  };
};

export const clearTerminal = () => {
  return {
    type: CLEAR_TERMINAL,
  }
}
