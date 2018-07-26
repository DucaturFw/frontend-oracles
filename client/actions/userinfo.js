import axios from 'axios';
import {
  FETCH_USERINFO_START,
  FETCH_USERINFO_SUCCESS,
  FETCH_USERINFO_FAILED,
  UPDATE_USERINFO_START,
  UPDATE_USERINFO_SUCCESS,
  UPDATE_USERINFO_FAILED
} from '../constant/userinfo-consts';
import { push } from 'connected-react-router';
import { USER_LOGOUT } from '../constant/login-consts';

const host = require('../config').host;

export const fetchUserInfo = id => {
  return async (dispatch, getState) => {
    if (id === 'self' && getState().userinfo.selfinfo.id) {
      dispatch({
        type: FETCH_USERINFO_SUCCESS,
        payload: getState().userinfo.selfinfo,
        self: false
      });
      return;
    }
    const hash = localStorage.getItem('hash');
    dispatch({ type: FETCH_USERINFO_START });
    await axios
      .get(`${host}/users/${id}/`, {
        headers: {
          Authorization: 'Basic ' + hash
        }
      })
      .then(res => {
        dispatch({
          type: FETCH_USERINFO_SUCCESS,
          payload: id === 'self' ? res.data.self : res.data,
          events: id === 'self' ? res.data.events : getState().userinfo.selfinfo.events,
          self: id === 'self'
        });
      })
      .catch(err => dispatch({ type: FETCH_USERINFO_FAILED, error: 'User does not exist or you do not have permissions.'}));
  };
};

export const updateUserInfo = state => {
  return (dispatch, getState) => {
    console.log(state);
    const userid = getState().userinfo.userinfo.id;
    const infoid = getState().userinfo.userinfo.info.id;
    const hash = localStorage.getItem('hash');
    dispatch({ type: UPDATE_USERINFO_START });
    try {
      axios
        .patch(
          `${host}/users/${userid}/`,
          JSON.stringify({
            name: state.name,
            family_name: state.family_name,
            email: state.email
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

          dispatch({
            type: UPDATE_USERINFO_SUCCESS
          });
        });

      axios
        .patch(
          `${host}/userinfo/${infoid}/`,
          JSON.stringify({
            eth_account: state.eth_account,
            organization_name: state.organization_name,
            tax_num: state.tax_num,
            payment_num: state.payment_num,
            files: '',
            user: userid
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
        });
    } catch (err) {
      dispatch({ type: UPDATE_USERINFO_FAILED, error: 'Failed: do you have proper permissions?' });
    }
    dispatch({
      type: UPDATE_USERINFO_SUCCESS
    });
    dispatch(fetchUserInfo('self'));
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('hash');
    dispatch({ type: USER_LOGOUT });
    dispatch(push('/'));
  };
};
