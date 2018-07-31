import { FETCH_IPFS_FILE_START, FETCH_IPFS_FILE_SUCCESS, FETCH_IPFS_FILE_FAILED } from '../constant/ipfs-consts';
import ipfs from '../utils/ipfs';
export const fetchIpfsFile = (hash, name) => {
  return async dispatch => {
    dispatch({ type: FETCH_IPFS_FILE_START });
    await ipfs.files.get(hash, function(err, files) {
      if (err) {
        dispatch({ type: FETCH_IPFS_FILE_FAILED });
      }
      let blob = new Blob([files[0].content], {
        type: 'application/octet-stream'
      });
      console.log(blob);
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.style = 'display: none';
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      dispatch({ type: FETCH_IPFS_FILE_SUCCESS });
    });
  };
};
