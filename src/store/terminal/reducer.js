import { COMPILE_CODE, CLEAR_TERMINAL } from './actions';

const initialState = []

export default function terminalReducer(state = initialState, action) {
  switch (action.type) {
    case COMPILE_CODE: {
      return [
        ...state,
        {
          ...action.payload
        }
      ]
    }
    case CLEAR_TERMINAL: {
      return initialState
    }
    default:
      return state;
  }
}
