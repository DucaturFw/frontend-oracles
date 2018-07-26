import {
  FETCH_USERINFO_START,
  FETCH_USERINFO_SUCCESS,
  FETCH_USERINFO_FAILED,
  UPDATE_USERINFO_START,
  UPDATE_USERINFO_SUCCESS,
  UPDATE_USERINFO_FAILED
} from '../constant/userinfo-consts';
import { USER_LOGOUT } from '../constant/login-consts';

const initialState = {
  preloader: false,
  userinfo: { info: {} },
  selfinfo: { info: {} },
  events: []
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERINFO_START:
      return { ...state, preloader: true };
    case FETCH_USERINFO_SUCCESS:
      if (action.self)
        return {
          ...state,
          preloader: false,
          selfinfo: action.payload,
          events: action.events,
        };
      else
        return {
          ...state,
          preloader: false,
          userinfo: action.payload
        };
    case FETCH_USERINFO_FAILED:
      return { ...state, preloader: false, error: action.error };
    case UPDATE_USERINFO_START:
      return { ...state, preloader: true };
    case UPDATE_USERINFO_SUCCESS:
      return { ...state, preloader: false };
    case UPDATE_USERINFO_FAILED:
      return { ...state, preloader: false, error: action.error };
    case USER_LOGOUT:
      return initialState;
  }

  return state;
}
