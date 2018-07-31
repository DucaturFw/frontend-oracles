import {
  FETCH_USERS_START,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  CREATE_CONTRACT_START,
  CREATE_CONTRACT_SUCCESS,
  CREATE_CONTRACT_FAILED
} from '../constant/createcontract-consts';

const initialState = {
  preloader: false,
  users: [],
  hash: '',
  filename: '',
  contract: {},
  error: '',
  loadingcontract: false
};
export default function createContractReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_START:
      return { ...state, preloader: true };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        preloader: false,
        users: action.payload
      };
    case FETCH_USERS_FAILED:
      return { ...state, preloader: false };
    case CREATE_CONTRACT_START:
      return { ...state, loadingcontract: true };
    case CREATE_CONTRACT_SUCCESS:
      return {
        ...state,
        preloader: false,
        contract: action.payload,
        loadingcontract: false
      };
    case CREATE_CONTRACT_FAILED:
      return { ...state, loadingcontract: false, error: action.payload || '' };
  }
  return state;
}
