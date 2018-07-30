import { FETCH_IPFS_FILE_START, FETCH_IPFS_FILE_SUCCESS, FETCH_IPFS_FILE_FAILED } from '../constant/ipfs-consts';
import ipfs from '../utils/ipfs';
export const fetchIpfsFile = () => {
  return async dispatch => {
    dispatch({ type: FETCH_IPFS_FILE_START });
    const validCID = 'Qmb4fqc5Ufr1keYzM2G5hGPaGqaEUUB4mRzJNe1C8bpDmm';
    await ipfs.files.get(validCID, function(err, files) {
      if (err) {
        dispatch({ type: FETCH_IPFS_FILE_FAILED });
      }
      console.log(files);

      dispatch({ type: FETCH_IPFS_FILE_SUCCESS, payload: files[0].content });
    });
  };
};
