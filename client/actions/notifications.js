import axios from 'axios';
import {
  FETCH_NOTIFICATIONS_START,
  FETCH_NOTIFICATIONS_SUCCESS,
  FETCH_NOTIFICATIONS_FAILED,
  UPDATE_NOTIFICATIONS_START,
  UPDATE_NOTIFICATIONS_SUCCESS,
  UPDATE_NOTIFICATIONS_FAILED,
  FETCH_NOTIF_USERS_SUCCESS
} from '../constant/notifications-consts';

const host = require('../config').host;

export const fetchNotifications = () => {
  return (dispatch, getState) => {
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
        return axios.get(`${host}/users/`, {
          headers: {
            Authorization: 'Basic ' + hash
          }
        });
      })
      .catch(err => dispatch({ type: FETCH_NOTIFICATIONS_FAILED }))
      .then(res => {
        dispatch({
          type: FETCH_NOTIF_USERS_SUCCESS,
          payload: res.data
        });
      })
      .catch(console.error);
  };
};

export const updateNotifications = () => {
  return async (dispatch, getState) => {
    const hash = localStorage.getItem('hash');
    const notifications = getState().notifications.notifications.filter(item => item.seen === false);
    console.log(notifications);
    dispatch({ type: UPDATE_NOTIFICATIONS_START });
    notifications.forEach(item => {
      axios
        .patch(
          `${host}/events/${item.id}/`,
          JSON.stringify({
            seen: true,
            event_type: item.event_type,
            contract: item.contract,
            stage: item.stage,
            user_by: item.user_by,
            user_to: item.user_to
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Basic ' + hash
            }
          }
        )
        .then(res => {
          console.log(res);
        })
        .catch(err => dispatch({ type: UPDATE_NOTIFICATIONS_FAILED }));
    });
    dispatch({ type: UPDATE_NOTIFICATIONS_SUCCESS });
    await dispatch(fetchNotifications());
  };
};
