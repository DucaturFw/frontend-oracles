import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED
} from '../constant/notifications-consts';

const initialState = {
  preloader: false,
  notifications: []
};
export default function transactionReducer(state = initialState, action) {
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
  }

  return state;
}
