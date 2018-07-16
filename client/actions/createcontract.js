import axios from 'axios';
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  CHANGE_CLIENT,
  CHANGE_EXECUTER
} from '../constant/createcontract-const';
const host = require('../config').host;
export function fetchUsers() {
  return dispatch => {
    dispatch({ type: FETCH_USERS_START });
    axios
      .get(`${host}/users/`, {
        headers: {
          Authorization: 'Basic ' + Buffer.from('duc@duc.duc:12345678a').toString('base64')
        }
      })
      .then(res => {
        console.log(res.data);
        const result = mapperArray(res.data);
        console.log(result);
        dispatch({
          type: FETCH_USERS_SUCCESS,
          payload: result
        });
      })
      .catch(err => dispatch({ type: FETCH_USERS_FAILED }));
  };
}

function mapperArray(array) {
  let result = [];
  array.forEach((item, index) => {
    result.push({
      key: index,
      value: `${item.name} ${item.family_name}`,
      text: `${item.name} ${item.family_name}`
    });
  });

  return result;
}
