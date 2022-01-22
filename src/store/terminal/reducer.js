import {
  CLEAR_TERMINAL,
  COMPILE_CODE_SUCCESSED,
  COMPILE_SHELL_SUCCESSED,
  CHECK_ANSWER_SUCCESSED,
} from './actions';

const initialState = {
  outputs: [],
  message: {
    status: '',
  },
  bytePayload: '',
};

export default function terminalReducer(state = initialState, action) {
  switch (action.type) {
    case COMPILE_CODE_SUCCESSED: {
      return {
        outputs: [...state.outputs, action.payload.data],
        message: {
          status: '',
        },
        bytePayload: action.payload.data.bytePayload,
      };
    }
    case COMPILE_SHELL_SUCCESSED: {
      return {
        outputs: [
          ...state.outputs,
          {
            bytePayload: null,
            error: '',
            output: `In [${action.payload.lineNumber}]: ${action.payload.code}`,
            status: 'shell',
          },
          action.payload.data,
        ],
        message: {
          status: '',
        },
      };
    }
    case CHECK_ANSWER_SUCCESSED: {
      return {
        outputs: [...state.outputs],
        message: action.payload.data,
        bytePayload: '',
      };
    }
    case CLEAR_TERMINAL: {
      return initialState;
    }
    default:
      return state;
  }
}
