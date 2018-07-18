import axios from 'axios';
import { FETCH_USERINFO_START, FETCH_USERINFO_SUCCESS, FETCH_USERINFO_FAILED } from '../constant/userinfo-consts';
const host = require('../config').host;
export function fetchUserInfo() {
  return (dispatch, getState) => {
    const login = getState().login.login;
    const password = getState().login.password;
    dispatch({ type: FETCH_USERINFO_START });
    axios
      .get(`${host}/users/1`, {
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64')
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch({
          type: FETCH_USERINFO_SUCCESS,
          payload: []
        });
      })
      .catch(err => dispatch({ type: FETCH_USERINFO_FAILED }));
  };
}
