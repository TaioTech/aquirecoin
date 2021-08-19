const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  'huge admit diamond winner noise pave grace novel recall walk choose learn',
  'https://rinkeby.infura.io/v3/e2790fb402004700bb40f44fc064a80b'
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ gas: '1000000', from: accounts[0], gasPrice: '5000000000' })
  
  console.log('Contract deployed to', result.options.address);
};

deploy();