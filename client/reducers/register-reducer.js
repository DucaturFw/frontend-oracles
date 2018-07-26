import { REGISTER_USER_START, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED } from '../constant/register-consts';

const initialState = {
  loading: false,
  error: ''
};

export default function registerReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER_START:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: ''
      };
    case REGISTER_USER_FAILED:
      return { ...state, loading: false, error: action.payload };
  }
  return state;
}
