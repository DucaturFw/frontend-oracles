import axios from 'axios';
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED
} from '../constant/notifications-consts';
const host = require('../config').host;
export function fetchNotifications() {
  return (dispatch, getState) => {
    // const login = getState().login.login;
    // const password = getState().login.password;
    const hash = localStorage.getItem('hash');
    dispatch({ type: FETCH_NOTIFICATIONS_START });
    axios
      .get(`${host}/events/`, {
        headers: {
          Authorization: 'Basic ' + hash
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_NOTIFICATIONS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => dispatch({ type: FETCH_NOTIFICATIONS_FAILED }));
  };
}
