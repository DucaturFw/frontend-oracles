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
    if (!getState().userinfo.selfinfo.id) {
      dispatch({ type: FETCH_CONTRACTS_FAILED });
      return;
    }
    axios
      .get(`${host}/contracts/?party__in=${getState().userinfo.selfinfo.id}`, {
        headers: {
          Authorization: 'Basic ' + hash
        }
      })
      .then(res => {
        const table = mapperTable(res.data);
        const executers = mapperFilterExecuter(res.data);
        const statuses = mapperFilterStatus(res.data);
        dispatch({
          type: FETCH_CONTRACTS_SUCCESS,
          payload: table,
          executers: executers,
          statuses: statuses
        });
      })
      .catch(err => {
        console.error(err);
        dispatch({ type: FETCH_CONTRACTS_FAILED });
      });
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
    const owner = item.in_party.filter(el => {
      return el.id === item.stages[item.finished].owner;
    });
    return {
      id: item.id,
      client: item.in_party.length > 0 ? `${item.in_party[0].name} ${item.in_party[0].family_name}` : '',
      executer: item.in_party.length > 1 ? `${item.in_party[0].name} ${item.in_party[0].family_name}` : '',
      starttime: item.stages.length > 0 ? item.stages[0].start : '',
      owner: `${owner[0].name} ${owner[0].family_name}`,
      dispute: item.stages.length > 0 ? item.stages[0].dispute_start_allowed : '',
      status: assignStatus(item.finished, item.stages)
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

const assignStatus = (item, stages) => {
  if (stages && stages.length && stages.find(stage => stage.dispute_started)) return 'Открыт диспут';
  return ['Активен', 'Ожидает завершения', 'Завершен'][item];
};
