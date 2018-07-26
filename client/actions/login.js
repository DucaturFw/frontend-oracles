import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS } from '../constant/login-consts';
import axios from 'axios';
import { push } from 'connected-react-router';
const host = require('../config').host;

export function authorization(login, password) {
  return dispatch => {
    dispatch({ type: USER_LOGIN_START });
    axios
      .get(`${host}/users/self/`, {
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64')
        }
      })
      .then(res => {
        console.log(res);
        dispatch({
          type: USER_LOGIN_SUCCESS,
          login: login,
          password: password
        });
        localStorage.setItem('hash', `${Buffer.from(`${login}:${password}`).toString('base64')}`);
        dispatch(push('/create'));
      })

      .catch(err => dispatch({ type: USER_LOGIN_FAILED }));
  };
};
