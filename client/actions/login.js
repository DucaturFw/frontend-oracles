import { USER_LOGIN_START, USER_LOGIN_FAILED, USER_LOGIN_SUCCESS } from '../constant/login-consts';
import history from '../store/history';
import axios from 'axios';
const host = require('../config').host;
export const authorization = (login, password) => {
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
        localStorage.setItem('login', 'true');
        localStorage.setItem('hash', `${Buffer.from(`${login}:${password}`).toString('base64')}`);
        history.push('/createcontract');
      })

      .catch(err => dispatch({ type: USER_LOGIN_FAILED }));
  };
};
