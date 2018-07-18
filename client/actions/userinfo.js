import axios from 'axios';
import { FETCH_USERINFO_START, FETCH_USERINFO_SUCCESS, FETCH_USERINFO_FAILED } from '../constant/userinfo-consts';
const host = require('../config').host;
export function fetchUserInfo() {
  return dispatch => {
    dispatch({ type: FETCH_USERINFO_START });
    axios
      .get(`${host}/users/1`, {
        headers: {
          Authorization: 'Basic ' + Buffer.from('duc@duc.duc:12345678a').toString('base64')
        }
      })
      .then(res => {
        console.log(res.data);
        // const result = mapperArray(res.data);
        //  console.log(result);
        dispatch({
          type: FETCH_USERINFO_SUCCESS,
          payload: []
        });
      })
      .catch(err => dispatch({ type: FETCH_USERINFO_FAILED }));
  };
}
