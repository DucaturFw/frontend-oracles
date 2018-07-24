import { FETCH_CONTRACT_START, FETCH_CONTRACT_SUCCESS, FETCH_CONTRACT_FAILED } from '../constant/contract-const';

const initialState = {
  preloader: false,
  id: null
};
export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONTRACT_START:
      return { ...state, preloader: true };
    case FETCH_CONTRACT_SUCCESS:
      return {
        ...state,
        id: action.id,
        preloader: false
      };
    case FETCH_CONTRACT_FAILED:
      return { ...state, preloader: false };
  }
  return state;
}
