import axios from 'axios';
import {
  FETCH_CONTRACTS_START,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_FAILED,
  CHANGE_EXECUTER_FILTER,
  CHANGE_STATUS_FILTER
} from '../constant/mycontracts-consts';

const host = require('../config').host;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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

const userName = el => ({ text: `${el.name} ${el.family_name} (${el.info.organization_name})`, key: el.id });

const mapperTable = array => {
  return array.map(item => {
    return {
      id: item.id,
      party: item.in_party.map(userName),
      starttime: item.stages[0].start,
      owner: userName(item.in_party.find(u => u.id === item.stages[0].owner)).text,
      dispute: item.stages[0].dispute_start_allowed,
      status: assignStatus(item.finished, item.stages)
    };
  });
};

const uniq = arr => {
  let seen = {};
  return arr.filter(item => (seen.hasOwnProperty(item.value) ? false : (seen[item.value] = true)));
};

const mapperFilterExecuter = array => {
  return uniq(
    array.map(item => {
      return {
        value: item.in_party[0].id,
        key: item.id,
        text: item.in_party.length > 0 ? `${item.in_party[0].name} ${item.in_party[0].family_name}` : ''
      };
    })
  );
};

const mapperFilterStatus = array => {
  return uniq(
    array.map(item => {
      return {
        value: assignStatus(item.finished, item.stages),
        key: item.id,
        text: assignStatus(item.finished, item.stages)
      };
    })
  );
};

const assignStatus = (item, stages) => {
  if (stages && stages.length && stages.find(stage => stage.dispute_started)) return 'Открыт диспут';
  return ['Активен', 'Ожидает завершения', 'Завершен'][item];
};
