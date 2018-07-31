import {
  FETCH_IPFS_FILE_START,
  FETCH_IPFS_FILE_SUCCESS,
  FETCH_IPFS_FILE_FAILED,
  SEND_FILE_IPFS_START,
  SEND_FILE_IPFS_FAILED,
  SEND_FILE_IPFS_SUCCESS
} from '../constant/ipfs-consts';

const initialState = {
  preloader: false,
  hash: '',
  filename: '',
  files: [],
  error: ''
};

export default function userInfoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_IPFS_FILE_START:
      return { ...state, preloader: true, error: '' };
    case FETCH_IPFS_FILE_SUCCESS:
      return { ...state, preloader: false };
    case FETCH_IPFS_FILE_FAILED:
      return { ...state, preloader: false, error: 'Ошибка при скачивании файла из IPFS' };
    case SEND_FILE_IPFS_START:
      return { ...state, preloader: true, error: '' };
    case SEND_FILE_IPFS_SUCCESS:
      return { ...state, preloader: false, hash: action.hash, filename: action.filename };
    case SEND_FILE_IPFS_FAILED:
      return { ...state, preloader: false, error: 'Ошибка при загрузке файла в IPFS' };
  }

  return state;
}
