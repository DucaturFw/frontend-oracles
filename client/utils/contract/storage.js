import abi from './storage_abi.json';
import web3 from './web3';

const contract = {
  address: '0x627e5649c7d3fdb24768b494a65a781ced83dcac',
  abi: abi
};
export default new web3.eth.Contract(contract.abi, contract.address);
