import axios from 'axios';
import { FETCH_CONTRACTS_START, FETCH_CONTRACTS_SUCCESS, FETCH_CONTRACTS_FAILED } from '../constant/mycontracts-consts';

const host = require('../config').host;
export function fetchContracts() {
  return (dispatch, getState) => {
    const hash = localStorage.getItem('hash');
    dispatch({ type: FETCH_CONTRACTS_START });
    if (!getState().userinfo.userinfo.id) {
      dispatch({ type: FETCH_CONTRACTS_FAILED });
      return;
    }
    axios
      .get(`${host}/contracts/?party__in=${getState().userinfo.userinfo.id}`, {
        headers: {
          Authorization: 'Basic ' + hash
        }
      })
      .then(res => {
        console.log(res.data);
        const result = mapperArray(res.data);
        dispatch({
          type: FETCH_CONTRACTS_SUCCESS,
          payload: result
        });
      })
      .catch(err => dispatch({ type: FETCH_CONTRACTS_FAILED }));
  };
}

const mapperArray = array => {
  return array.map(item => {
    return {
      id: item.id,
      client: item.in_party.length > 0 ? `${item.in_party[0].name}   ${item.in_party[0].family_name}` : '',
      executer: item.in_party.length > 1 ? `${item.in_party[0].name}   ${item.in_party[0].family_name}` : '',
      starttime: item.stages.length > 0 ? item.stages[0].start : ''
    };
  });
};
