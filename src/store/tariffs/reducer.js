import { GET_TARIFFS_SUCCESSED } from './actions';

const initialState = {
  tariffList: [],
};

export default function tariffsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TARIFFS_SUCCESSED: {
      return {
        ...state,
        tariffList: action.payload.data,
      };
    }
    default:
      return state;
  }
}
