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
import storehash from '../utils/contract/index';
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

export const createcontract = () => {
  return async (dispatch, getState) => {
    const hash = getState().createcontract.hash;
    // const accounts = await web3.eth.getAccounts();
    // dispatch({ type: CREATE_CONTRACT_START });
    // console.log('Sending from Metamask account: ' + accounts[0]);
    // //obtain contract address from storehash.js
    // const ethAddress = await storehash.options.address;
    // storehash.methods.sendHash('').send(
    //   {
    //     from: accounts[0]
    //   },
    //   (error, transactionHash) => {
    //     console.log(transactionHash);
    //     if (error) {
    //       dispatch({ type: CREATE_CONTRACT_FAILED });
    //       return;
    //     }
    //     dispatch({ type: CREATE_CONTRACT_SUCCESS });
    //   }
    // );
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
