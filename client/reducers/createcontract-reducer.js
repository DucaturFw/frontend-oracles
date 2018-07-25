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

const initialState = {
  preloader: false,
  users: [],
  hash: '',
  contract: {},
  error: '',
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
      return { ...state, preloader: true };
    case CREATE_CONTRACT_SUCCESS:
      return {
        ...state,
        preloader: false,
        contract: action.payload
      };
    case CREATE_CONTRACT_FAILED:
      return { ...state, preloader: false, error: action.payload || '' };
    case SEND_FILE_IPFS_START:
      return state;
    case SEND_FILE_IPFS_SUCCESS:
      return { ...state, hash: action.hash };
    case SEND_FILE_IPFS_FAILED:
      return state;
  }
  return state;
}
