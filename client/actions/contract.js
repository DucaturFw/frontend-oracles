import axios from 'axios';
import { LOAD_CONTRACT_FAILED, LOAD_CONTRACT_START, LOAD_CONTRACT_SUCCESS } from '../constant/contract-consts';

const host = require('../config').host;

export function loadData(id) {
  return dispatch => {
    const hash = localStorage.getItem('hash');
    dispatch({ type: LOAD_CONTRACT_START });
    axios
      .get(`${host}/contracts/${id}`, {
        headers: {
          Authorization: 'Basic ' + hash
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch({
          type: LOAD_CONTRACT_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => dispatch({ type: LOAD_CONTRACT_FAILED }));
  };
}
