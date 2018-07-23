import contract from './storage';
import web3 from './web3';

export default new web3.eth.Contract(contract.abi, contract.address);
