import { FETCH_USERS_START, FETCH_USERS_SUCCESS, FETCH_USERS_FAILED } from '../constant/createcontract-const';

const initialState = {
  preloader: false,
  users: []
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
  }
  return state;
}
