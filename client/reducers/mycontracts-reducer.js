import {
  FETCH_CONTRACTS_START,
  FETCH_CONTRACTS_SUCCESS,
  FETCH_CONTRACTS_FAILED,
  CHANGE_CLIENT_FILTER,
  CHANGE_EXECUTER_FILTER,
  CHANGE_STATUS_FILTER
} from '../constant/mycontracts-consts';

const initialState = {
  preloader: false,
  contracts: [],
  clients: [],
  executers: [],
  statuses: [],
  client: '',
  executer: '',
  status: ''
};
export default function myContractsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTRACTS_START:
      return { ...state, preloader: true };
    case FETCH_CONTRACTS_SUCCESS:
      return {
        ...state,
        preloader: false,
        contracts: action.payload,
        clients: action.clients,
        executers: action.executers,
        statuses: action.statuses
      };
    case FETCH_CONTRACTS_FAILED:
      return { ...state, preloader: false };
    case CHANGE_CLIENT_FILTER:
      return { ...state, client: action.payload };
    case CHANGE_EXECUTER_FILTER:
      return { ...state, executer: action.payload };
    case CHANGE_STATUS_FILTER:
      return { ...state, executer: action.payload };
  }

  return state;
}
