import axios from 'axios';
import { FETCH_CONTRACT_START, FETCH_CONTRACT_SUCCESS, FETCH_CONTRACT_FAILED } from '../constant/contract-consts';

const host = require('../config').host;

export function fetchContract(id) {
  return dispatch => {
    const hash = localStorage.getItem('hash');
    dispatch({ type: FETCH_CONTRACT_START });
    axios
      .get(`${host}/contracts/${id}`, {
        headers: {
          Authorization: 'Basic ' + hash
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch({
          type: FETCH_CONTRACT_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => dispatch({ type: FETCH_CONTRACT_FAILED }));
  };
}
