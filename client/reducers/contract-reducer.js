import { FETCH_CONTRACT_START, FETCH_CONTRACT_SUCCESS, FETCH_CONTRACT_FAILED } from '../constant/contract-consts';

const initialState = {
  preloader: false,
  contract: {}
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
  }
  return state;
}
