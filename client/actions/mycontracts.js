import axios from 'axios';
import {
  FETCH_CONTRACTS_START,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_FAILED,
  CHANGE_CLIENT_FILTER,
  CHANGE_EXECUTER_FILTER,
  CHANGE_STATUS_FILTER
} from '../constant/mycontracts-consts';

const host = require('../config').host;
export const fetchContracts = () => {
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
        const table = mapperTable(res.data);
        const clients = mapperFilterClient(res.data);
        const executers = mapperFilterExecuter(res.data);
        const statuses = mapperFilterStatus(res.data);
        dispatch({
          type: FETCH_CONTRACTS_SUCCESS,
          payload: table,
          clients: clients,
          executers: executers,
          statuses: statuses
        });
      })
      .catch(err => dispatch({ type: FETCH_CONTRACTS_FAILED }));
  };
};
export const changeClientFilter = client => {
  return dispatch => {
    dispatch({ type: CHANGE_CLIENT_FILTER, payload: client });
  };
};
export const changeExecuterFilter = executer => {
  return dispatch => {
    dispatch({ type: CHANGE_EXECUTER_FILTER, payload: executer });
  };
};
export const changeStatusFilter = status => {
  return dispatch => {
    dispatch({ type: CHANGE_STATUS_FILTER, payload: status });
  };
};

const mapperTable = array => {
  return array.map(item => {
    return {
      id: item.id,
      client: item.in_party.length > 0 ? `${item.in_party[0].name} ${item.in_party[0].family_name}` : '',
      executer: item.in_party.length > 1 ? `${item.in_party[0].name} ${item.in_party[0].family_name}` : '',
      starttime: item.stages.length > 0 ? item.stages[0].start : '',
      dispute: item.stages.length > 0 ? item.stages[0].dispute_start_allowed : '',
      status: assignStatus(item.finished)
    };
  });
};

const mapperFilterClient = array => {
  return array.map(item => {
    return {
      value: item.in_party.length > 0 ? `${item.in_party[0].name} ${item.in_party[0].family_name}` : '',
      key: item.id,
      text: item.in_party.length > 0 ? `${item.in_party[0].name} ${item.in_party[0].family_name}` : ''
    };
  });
};
const mapperFilterExecuter = array => {
  return array.map(item => {
    return {
      value: item.in_party.length > 0 ? `${item.in_party[0].name} ${item.in_party[0].family_name}` : '',
      key: item.id,
      text: item.in_party.length > 1 ? `${item.in_party[0].name} ${item.in_party[0].family_name}` : ''
    };
  });
};

const mapperFilterStatus = array => {
  return array.map(item => {
    return {
      value: assignStatus(item.finished),
      key: item.id,
      text: assignStatus(item.finished)
    };
  });
};

const assignStatus = item => {
  switch (item) {
    case item === 0:
      return 'идет';
    case item === 1:
      return 'ожидает завершения';
    case item === 2:
      return 'завершен';
    default:
      return 'идет';
  }
};
