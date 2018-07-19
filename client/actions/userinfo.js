import axios from 'axios';
import { FETCH_USERINFO_START, FETCH_USERINFO_SUCCESS, FETCH_USERINFO_FAILED } from '../constant/userinfo-consts';
const host = require('../config').host;
export function fetchUserInfo() {
  return (dispatch, getState) => {
    // const login = getState().login.login;
    // const password = getState().login.password;
    if (getState().userinfo.userinfo.id) return;
    const hash = localStorage.getItem('hash');
    dispatch({ type: FETCH_USERINFO_START });
    axios
      .get(`${host}/users/self`, {
        headers: {
          Authorization: 'Basic ' + hash
        }
      })
      .then(res => {
        console.log(res.data.self);
        dispatch({
          type: FETCH_USERINFO_SUCCESS,
          payload: res.data.self
        });
      })
      .catch(err => dispatch({ type: FETCH_USERINFO_FAILED }));
  };
}
