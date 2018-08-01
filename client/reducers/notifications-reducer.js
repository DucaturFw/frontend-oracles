import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED,
  UPDATE_NOTIFICATIONS_START,
  UPDATE_NOTIFICATIONS_SUCCESS,
  UPDATE_NOTIFICATIONS_FAILED,
  FETCH_NOTIF_USERS_SUCCESS
} from '../constant/notifications-consts';

const initialState = {
  preloader: false,
  notifications: [],
  users: []
};
export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_START:
      return { ...state, preloader: true };
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        preloader: false,
        notifications: action.payload
      };
    case FETCH_NOTIFICATIONS_FAILED:
      return { ...state, preloader: false };
    case UPDATE_NOTIFICATIONS_START:
      return state;
    case UPDATE_NOTIFICATIONS_SUCCESS:
      return state;
    case UPDATE_NOTIFICATIONS_FAILED:
      return state;
    case FETCH_NOTIF_USERS_SUCCESS:
      return { ...state, users: action.payload };
  }

  return state;
}
