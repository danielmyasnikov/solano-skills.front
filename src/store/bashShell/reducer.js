import { EXECUTE_BASH_SHELL_SUCCESSED, START_ENVIRONMENT_SUCCESSED } from './actions';

const initialState = {
  outputs: [],
  message: {
    status: '',
  },
  environmentId: '',
};

export default function bashShellReducer(state = initialState, action) {
  switch (action.type) {
    case START_ENVIRONMENT_SUCCESSED: {
      console.log(action);
      return {
        outputs: [...state.outputs],
        message: {
          status: '',
        },
        environmentId: action.payload.data.output,
      };
    }
    case EXECUTE_BASH_SHELL_SUCCESSED: {
      return {
        outputs: [
          ...state.outputs,
          { status: '', output: `$ ${action.payload.command}`, error: '' },
          action.payload.data,
        ],
        message: {
          status: '',
        },
        environmentId: state.environmentId,
      };
    }
    default:
      return state;
  }
}