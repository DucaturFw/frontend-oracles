import axios from 'axios';
import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  SEND_FILE_IPFS_START,
  SEND_FILE_IPFS_SUCCESS,
  SEND_FILE_IPFS_FAILED,
  POST_CONTRACT_FAILED, POST_CONTRACT_START, POST_CONTRACT_SUCCESS
} from '../constant/createcontract-const';
import ipfs from '../utils/ipfs';
import { push } from 'connected-react-router';

const host = require('../config').host;

export function fetchUsers() {
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
}

export function postNewContract(data) {
  return dispatch => {
    const hash = localStorage.getItem('hash');
    dispatch({ type: POST_CONTRACT_START });
    axios
      .post(`${host}/contracts/`, {
        headers: {
          Authorization: 'Basic ' + hash
        }
      })
      .then(res => {
        console.log(res.data);
        dispatch({
          type: POST_CONTRACT_SUCCESS,
          payload: res.data
        });
        dispatch(push(`/contracts/${res.data.id}`));
      })
      .catch(err => dispatch({ type: POST_CONTRACT_FAILED }));
  };
}

export function sendFileIpfs(event) {
  return dispatch => {
    dispatch({ type: SEND_FILE_IPFS_START });
    // const hash = localStorage.getItem('hash');
    const file = event.target.files[0];
    let reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => this.convertToBuffer(reader);
    const buffer = Buffer.from(reader.result);
    ipfs.add(buffer, (err, ipfsHash) => {
      //  dispatch({type:SEND_FILE_IPFS_FAILED});
      console.log(err, ipfsHash);
    });
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
