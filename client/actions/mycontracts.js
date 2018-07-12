import axios from 'axios';
import { FETCH_CONTRACTS_START, FETCH_CONTRACTS_SUCCESS, FETCH_CONTRACTS_FAILED } from '../constant/mycontracts-const';

export function fetchContracts() {
  return dispatch => {
    dispatch({ type: FETCH_CONTRACTS_START });
    axios
      .get('http://18.191.139.227/contracts/', {
        headers: {
          Authorization: 'Basic ' + Buffer.from('duc@duc.duc:12345678a').toString('base64')
        }
      })
      .then(res => {
        console.log(res.data);
        const result = mapperArray(res.data);
        console.log(result);
        dispatch({
          type: FETCH_CONTRACTS_SUCCESS,
          payload: result
        });
      })
      .catch(err => dispatch({ type: FETCH_CONTRACTS_FAILED }));
  };
}

function mapperArray(array) {
  let result = [];
  array.forEach((item, index) => {
    result.push({
      id: item.id,
      client:
        item[index].party[0].name && item[index].party[0].family_name
          ? `${item[index].party[0].name}   ${item[index].party[0].family_name}`
          : '',
      executer:
        item[index].party[0].name && item[index].party[0].family_name
          ? `${item[index].party[0].name}   ${item[index].party[0].family_name}`
          : '',
      starttime: item.stages[0].start ? item.stages[0].start : ''

      //  owner: item.stages
    });
  });
  return result;
}
