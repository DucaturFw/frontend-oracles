import axios from 'axios';
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  SEND_FILE_IPFS_START,
  SEND_FILE_IPFS_SUCCESS,
  SEND_FILE_IPFS_FAILED,
  CREATE_CONTRACT_START,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_FAILED
} from '../constant/createcontract-const';
import ipfs from '../utils/ipfs';
import web3 from '../utils/contract/web3';
import { push } from 'connected-react-router';
import storehash from '../utils/contract/storage';

const host = require('../config').host;

export const fetchUsers = () => {
  return dispatch => {
    const hash = localStorage.getItem('hash');
    dispatch({ type: FETCH_USERS_START });
    axios
      .get(`${host}/users/`, {
        headers: {
          Authorization: 'Basic ' + hash
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
};

export const sendFileIpfs = buffer => {
  return async dispatch => {
    dispatch({ type: SEND_FILE_IPFS_START });
    console.log(buffer);
    ipfs.add(buffer, (err, ipfsHash) => {
      if (err) {
        dispatch({ type: SEND_FILE_IPFS_FAILED });
        return;
      }
      dispatch({ type: SEND_FILE_IPFS_SUCCESS, hash: ipfsHash[0].hash });
      console.log(ipfsHash);
    });
  };
};

export const createContract = () => {
  return (dispatch, getState) => {
    const loginHash = localStorage.getItem('hash');
    dispatch({ type: CREATE_CONTRACT_START });
    axios
      .post(`${host}/contracts/`, {
        headers: {
          Authorization: 'Basic ' + loginHash
        }
      })
      .then(async (res) => {
        const hash = getState().createcontract.hash;
        const account = web3.eth.defaultAccount;
        console.log('Sending from Metamask account: ' + account);
        await web3.eth.getAccounts().then(res => console.log(res));
        await storehash.methods.sendHash(hash).send(
          {
            from: account || '0xD6669D7f59f3733F21bbb6bD49b174a59Dfcc3Ce'
          },
          (error, transactionHash) => {
            if (error) {
              dispatch({ type: CREATE_CONTRACT_FAILED });
              return;
            }
            dispatch({
              type: CREATE_CONTRACT_SUCCESS,
              payload: res.data
            });
            dispatch(push(`/contracts/${res.data.id}`));
          }
        );
      })
      .catch(err => dispatch({ type: CREATE_CONTRACT_FAILED,
        payload: "FAILED TO UPLOAD TO ETH" }));
  };
};

const mapperArray = array => {
  let result = [];
  array.forEach((item, index) => {
    result.push({
      key: index,
      value: `${item.name} ${item.family_name}`,
      text: `${item.name} ${item.family_name}`
    });
  });

  return result;
};
