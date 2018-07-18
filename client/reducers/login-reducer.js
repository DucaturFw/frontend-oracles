import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS } from '../constant/login-consts';

const initialState = {
  login: '',
  password: '',
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
        password: action.password,
        preloader: false,
        authenticated: true,
        error: false
      };
    case USER_LOGIN_FAILED:
      return { ...state, preloader: false, error: true };
  }
  return state;
}
