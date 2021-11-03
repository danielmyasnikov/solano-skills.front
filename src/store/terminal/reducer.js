import { CLEAR_TERMINAL, COMPILE_CODE_SUCCESSED, CHECK_ANSWER_SUCCESSED } from './actions';

const initialState = {
  outputs: [],
  message: {
    status: '',
  },
};

export default function terminalReducer(state = initialState, action) {
  switch (action.type) {
    case COMPILE_CODE_SUCCESSED: {
      return {
        outputs: [...state.outputs, action.payload.data],
        message: state.message,
      };
    }
    case CHECK_ANSWER_SUCCESSED: {
      return {
        outputs: [...state.outputs, action.payload.data],
        message: action.payload.data,
      };
    }
    case CLEAR_TERMINAL: {
      return initialState;
    }
    default:
      return state;
  }
}
