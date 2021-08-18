const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile')

const INITIAL_MESSAGE = 'Hi there!';
const INFURA_URL = 'https://rinkeby.infura.io/v3/e2790fb402004700bb40f44fc064a80b';
let accounts, from, inbox;
let arguments = [INITIAL_MESSAGE];
let data = bytecode;
let gas = '1000000';

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  from = accounts[0];
  // Use one of the accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data, arguments })
    .send({ from: accounts[0], gas })
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, INITIAL_MESSAGE);
  })
})