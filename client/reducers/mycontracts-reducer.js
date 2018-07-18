import { FETCH_CONTRACTS_START, FETCH_CONTRACTS_SUCCESS, FETCH_CONTRACTS_FAILED } from '../constant/mycontracts-const';

const initialState = {
  preloader: false,
  contracts: []
};
export default function myContractsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTRACTS_START:
      return { ...state, preloader: true };
    case FETCH_CONTRACTS_SUCCESS:
      return {
        ...state,
        preloader: false,
        contracts: action.payload
      };
    case FETCH_CONTRACTS_FAILED:
      return { ...state, preloader: false };
  }

  return state;
}
