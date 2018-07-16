import axios from 'axios';
import { FETCH_USERINFO_START, FETCH_USERINFO_SUCCESS, FETCH_USERINFO_FAILED } from '../constant/userinfo-consts';
const host = require('../config').host;
export function fetchUserInfo() {
  return dispatch => {
    dispatch({ type: FETCH_USERINFO_START });
    axios
      .get(`${host}/userinfo/`, {
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

function mapperArray(array) {
  let result = [];
  array.forEach((item, index) => {
    result.push({
      id: item.id,
      client: item.party.length > 0 ? `${item.party['0'].name}   ${item.party['0'].family_name}` : '',
      executer: item.party.length > 0 ? `${item.party['1'].name}   ${item.party['1'].family_name}` : '',
      starttime: item.stages.length > 0 ? item.stages[0].start : ''
    });
  });

  return result;
}
