import axios from 'axios';
import web3 from '../utils/contract/web3';
import {
  FETCH_CONTRACT_START,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_FAILED,
  DISPUTE_STAGE_START,
  DISPUTE_STAGE_SUCCESS,
  DISPUTE_STAGE_FAILED,
  CASE_FINISH_START,
  CASE_FINISH_FAILED,
  CASE_FINISH_SUCCESS
} from '../constant/contract-consts';
import disputes from '../utils/contract/disputes';
import ipfs from '../utils/ipfs';
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

export function openDispute(case_id, stage_id) {
  return async dispatch => {
    dispatch({ type: DISPUTE_STAGE_START });
    try {
      const accounts = await web3.eth.getAccounts();
      console.log('Sending from Metamask account: ' + accounts[0]);

      await disputes.methods.openDispute(case_id, stage_id).send(
        {
          from: accounts[0]
        },
        (error, transactionHash) => {
          if (error) {
            dispatch({ type: DISPUTE_STAGE_FAILED, payload: 'FAILED TO SEND TRANSACTION TO BLOCKCHAIN' });
            return;
          }
          dispatch({
            type: DISPUTE_STAGE_SUCCESS,
            msg: transactionHash
          });
        }
      );
    } catch (error) {
      dispatch({ type: DISPUTE_STAGE_FAILED, payload: 'FAILED TO SEND TRANSACTION TO BLOCKCHAIN' });
    }
  };
}

export function finishCase(case_id) {
  return async dispatch => {
    dispatch({ type: CASE_FINISH_START });
    try {
      const accounts = await web3.eth.getAccounts();
      console.log('Sending from Metamask account: ' + accounts[0]);
      await disputes.methods.finishCase(case_id).send(
        {
          from: accounts[0]
        },
        (error, transactionHash) => {
          if (error) {
            dispatch({ type: CASE_FINISH_FAILED, payload: 'FAILED TO SEND TRANSACTION TO BLOCKCHAIN' });
            return;
          }
          dispatch({
            type: CASE_FINISH_SUCCESS,
            msg: transactionHash
          });
        }
      );
    } catch (error) {
      dispatch({ type: CASE_FINISH_FAILED, payload: 'FAILED TO SEND TRANSACTION TO BLOCKCHAIN' });
    }
  };
}
