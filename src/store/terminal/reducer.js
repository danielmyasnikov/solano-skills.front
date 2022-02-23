import {
  CLEAR_TERMINAL,
  COMPILE_CODE_SUCCESSED,
  COMPILE_SHELL_SUCCESSED,
  CHECK_ANSWER_SUCCESSED,
  KERNEL_SUCCESSED,
} from './actions';

const initialState = {
  outputs: [],
  message: {
    status: '',
  },
  kernelId: '',
  bytePayload: '',
};

// eslint-disable-next-line default-param-last
export default function terminalReducer(state = initialState, action) {
  switch (action.type) {
    case COMPILE_CODE_SUCCESSED: {
      return {
        outputs: [...state.outputs, action.payload.data],
        message: {
          status: '',
        },
        kernelId: state.kernelId,
        bytePayload: action.payload.data.bytePayload,
      };
    }
    case KERNEL_SUCCESSED: {
      return {
        outputs: [...state.outputs],
        message: {
          status: '',
        },
        kernelId: action.payload.data.output,
        bytePayload: state.bytePayload,
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
        kernelId: state.kernelId,
      };
    }
    case CHECK_ANSWER_SUCCESSED: {
      return {
        outputs: [...state.outputs],
        message: action.payload.data,
        bytePayload: '',
        kernelId: state.kernelId,
      };
    }
    case CLEAR_TERMINAL: {
      return initialState;
    }
    default:
      return state;
  }
}
