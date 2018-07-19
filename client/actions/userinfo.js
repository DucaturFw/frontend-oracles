import axios from 'axios';
import {
  FETCH_USERINFO_START,
  FETCH_USERINFO_SUCCESS,
  FETCH_USERINFO_FAILED,
  UPDATE_USERINFO_START,
  UPDATE_USERINFO_SUCCESS,
  UPDATE_USERINFO_FAILED
} from '../constant/userinfo-consts';
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
        dispatch({
          type: FETCH_USERINFO_SUCCESS,
          payload: res.data.self
        });
      })
      .catch(err => dispatch({ type: FETCH_USERINFO_FAILED }));
  };
}

export function updateUserInfo(state) {
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

          dispatch({
            type: UPDATE_USERINFO_SUCCESS
          });
        });
    } catch (err) {
      dispatch({ type: UPDATE_USERINFO_FAILED });
    }
  };
}
