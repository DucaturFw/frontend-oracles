import {
  FETCH_CONTRACT_START,
  FETCH_CONTRACT_SUCCESS,
  FETCH_CONTRACT_FAILED,
  DISPUTE_STAGE_START,
  DISPUTE_STAGE_SUCCESS,
  DISPUTE_STAGE_FAILED,
  CASE_FINISH_START,
  CASE_FINISH_SUCCESS,
  CASE_FINISH_FAILED,
  DELETE_MESSAGE
} from '../constant/contract-consts';

const initialState = {
  preloader: false,
  contract: {},
  msg: ''
};

export default function contractReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTRACT_START:
      return { ...state, preloader: true };
    case FETCH_CONTRACT_SUCCESS:
      return {
        ...state,
        preloader: false,
        contract: action.payload
      };
    case FETCH_CONTRACT_FAILED:
      return { ...state, preloader: false };
    case DISPUTE_STAGE_START:
      return { ...state, preloader: true };
    case DISPUTE_STAGE_SUCCESS:
      return {
        ...state,
        preloader: false,
        msg: 'Your transaction hash: ' + action.msg
      };
    case DISPUTE_STAGE_FAILED:
      return { ...state, preloader: false };
    case CASE_FINISH_START:
      return { ...state, preloader: true };
    case CASE_FINISH_SUCCESS:
      return {
        ...state,
        preloader: false,
        msg: 'Your transaction hash: ' + action.msg
      };
    case CASE_FINISH_FAILED:
      return { ...state, preloader: false, msg: action.payload };
    case DELETE_MESSAGE:
      return { ...state, msg: '' };
  }
  return state;
}
