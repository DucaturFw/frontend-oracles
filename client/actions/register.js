import axios from 'axios';
import { REGISTER_USER_FAILED, REGISTER_USER_START, REGISTER_USER_SUCCESS } from '../constant/register-consts';
import { push } from 'connected-react-router';
import { USER_LOGIN_SUCCESS } from '../constant/login-consts';

const host = require('../config').host;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export const registerUser = user_info => {
  return dispatch => {
    console.log(user_info);
    dispatch({ type: REGISTER_USER_START });
    const data = { ...user_info };
    data.info = { ...user_info };
    axios
      .post(`${host}/users/`, JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } })
      .then(res => {
        console.log(res);
        dispatch({
          type: REGISTER_USER_SUCCESS
        });
        localStorage.setItem('hash', `${Buffer.from(`${user_info.email}:${user_info.password}`).toString('base64')}`);
        dispatch({
          type: USER_LOGIN_SUCCESS,
          login: user_info.email
        });
        dispatch(push('/create'));
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: REGISTER_USER_FAILED, error: err });
      });
  };
};
