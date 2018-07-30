import Web3 from 'web3';
let web3;
if (window.web3) {
  web3 = new Web3(window.web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider('https://www.rinkeby.io'));
}

export default web3;
