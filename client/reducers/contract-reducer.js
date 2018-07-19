import { LOAD_CONTRACT_FAILED, LOAD_CONTRACT_START, LOAD_CONTRACT_SUCCESS } from '../constant/contract-consts';

const initialState = {
  preloader: false,
  contract: {}
};

export default function contractReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONTRACT_START:
      return { ...state, preloader: true };
    case LOAD_CONTRACT_SUCCESS:
      return {
        ...state,
        preloader: false,
        contract: action.payload
      };
    case LOAD_CONTRACT_FAILED:
      return { ...state, preloader: false };
  }
  return state;
}
