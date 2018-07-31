import { FETCH_IPFS_FILE_START, FETCH_IPFS_FILE_SUCCESS, FETCH_IPFS_FILE_FAILED } from '../constant/ipfs-consts';

const initialState = {
  preloader: false,
  files: []
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_IPFS_FILE_START:
      return state;
    case FETCH_IPFS_FILE_SUCCESS:
      return state;
    case FETCH_IPFS_FILE_FAILED:
      return state;
  }

  return state;
}
