import axios from 'axios';
import { FETCH_CONTRACTS_START, FETCH_CONTRACTS_SUCCESS, FETCH_CONTRACTS_FAILED } from '../constant/mycontracts-const';
const host = require('../config').host;
export function fetchContracts() {
  return (dispatch, getState) => {
    const login = getState().login.login;
    const password = getState().login.password;
    dispatch({ type: FETCH_CONTRACTS_START });
    axios
      .get(`${host}/contracts/`, {
        headers: {
          Authorization: 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64')
        }
      })
      .then(res => {
        console.log(res.data);
        const result = mapperArray(res.data);
        console.log(result);
        dispatch({
          type: FETCH_CONTRACTS_SUCCESS,
          payload: result
        });
      })
      .catch(err => dispatch({ type: FETCH_CONTRACTS_FAILED }));
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
