const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const {interface, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts, inbox;

beforeEach( async () => {
    accounts = await web3.eth.getAccounts();

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Initial Message Goes here.']})
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox Text', () => {

    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('should have a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Initial Message Goes here.');
    });

    it('should update the store of the contract', async () => {

        const transactionHash = await inbox.methods.setMessage('Hi There!!').send({from: accounts[0]});

        const message = await inbox.methods.message().call();

        assert.equal(message, 'Hi There!!');

    });

})

