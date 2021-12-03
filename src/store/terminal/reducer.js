import { CLEAR_TERMINAL, COMPILE_CODE_SUCCESSED, CHECK_ANSWER_SUCCESSED } from './actions';

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
        bytePayload: action.payload.data.bytePayload || state.bytePayload,
      };
    }
    case CHECK_ANSWER_SUCCESSED: {
      return {
        outputs: [...state.outputs, action.payload.data],
        message: action.payload.data,
        bytePayload: action.payload.data.bytePayload || state.bytePayload,
      };
    }
    case CLEAR_TERMINAL: {
      return initialState;
    }
    default:
      return state;
  }
}
