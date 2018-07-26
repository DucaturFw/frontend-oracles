import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS, USER_LOGOUT } from '../constant/login-consts';

const initialState = {
  login: '',
  preloader: false,
  authenticated: false,
  error: false
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_START:
      return { ...state, preloader: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        login: action.login,
        preloader: false,
        authenticated: true,
        error: false
      };
    case USER_LOGIN_FAILED:
      return { ...state, preloader: false, error: true };
    case USER_LOGOUT:
      return initialState;
  }
  return state;
}
