import {
  FETCH_USERINFO_START,
  FETCH_USERINFO_SUCCESS,
  FETCH_USERINFO_FAILED,
  UPDATE_USERINFO_START,
  UPDATE_USERINFO_SUCCESS,
  UPDATE_USERINFO_FAILED,
  FETCH_IPFS_FILE_START,
  FETCH_IPFS_FILE_SUCCESS,
  FETCH_IPFS_FILE_FAILED
} from '../constant/userinfo-consts';
import { USER_LOGOUT } from '../constant/login-consts';

const initialState = {
  preloader: false,
  userinfo: { info: {} },
  selfinfo: { info: {} },
  events: [],
  files: []
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
          events: action.events
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
    case FETCH_IPFS_FILE_START:
      return state;
    case FETCH_IPFS_FILE_SUCCESS:
      return { ...state, files: action.payload };
    case FETCH_IPFS_FILE_FAILED:
      return state;
  }

  return state;
}
