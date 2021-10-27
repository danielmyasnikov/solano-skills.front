import { COMPILE_CODE } from "./actions";

const initialState = {
  data: []
};

export default function terminalReducer(state = initialState, action) {
  switch (action.type) {
    case COMPILE_CODE: {
      return {
        ...state,
        data: action.payload
      };
    }

    default:
      return state;
  }
}

