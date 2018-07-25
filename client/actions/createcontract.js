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
} from '../constant/createcontract-consts';
import ipfs from '../utils/ipfs';
import web3 from '../utils/contract/web3';
import { push } from 'connected-react-router';
import disputes from '../utils/contract/disputes';
import moment from 'moment';

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

export const createContract = data => {
  return (dispatch, getState) => {
    const hash = getState().createcontract.hash;
    data.filename = hash;
    const loginHash = localStorage.getItem('hash');
    dispatch({ type: CREATE_CONTRACT_START });
    axios
      .post(`${host}/contracts/`, data, {
        headers: {
          Authorization: 'Basic ' + loginHash
        }
      })
      .then(async res => {
        const accounts = await web3.eth.getAccounts();
        console.log('Sending from Metamask account: ' + accounts[0]);

        let party = res.data.in_party.map(u => u.eth_account);
        let stages_starts = [],
          stages_dispute_starts = [],
          stages_owners = [];
        data.stages.forEach(s => {
          stages_starts.push(moment(s.start, 'YYYY-MM-DD').seconds());
          stages_dispute_starts.push(moment(s.dispute_start_allowed, 'YYYY-MM-DD').seconds());
          stages_owners.push(s.owner);
        });
        await disputes.methods
          .openCase(res.data.id, party, stages_starts, stages_dispute_starts, stages_owners, hash)
          .send(
            {
              from: accounts[0]
            },
            (error, transactionHash) => {
              if (error) {
                dispatch({ type: CREATE_CONTRACT_FAILED, payload: 'FAILED TO LOAD TO BLOCKCHAIN' });
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
      .catch(err => {
        console.error(err);
        dispatch({
          type: CREATE_CONTRACT_FAILED,
          payload: 'FAILED TO CREATE ON SERVER'
        });
      });
  };
};

const mapperArray = array => {
  let result = [];
  array.forEach((item, index) => {
    result.push({
      key: item.id,
      value: +item.id,
      text: `${item.name} ${item.family_name}`
    });
  });

  return result;
};
