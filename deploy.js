const HDWalletProvider =  require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const {bytecode, interface} = require('./compile');

const provider = new HDWalletProvider(
    'suit abuse lyrics jeans defy enroll profit menu pill oak margin myself',
    'https://ropsten.infura.io/v3/0df6654d885a4f3697fffa8e0fdbf8e9'
);

const web3 = new Web3(provider);

const deploy = async () => {

    const accountsList = await web3.eth.getAccounts();
    const mainAccount = accountsList[0];

    const inboxContract = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode, arguments: ['Initial Message']})
        .send({from: mainAccount, gas: '1000000'});

    console.log(`Contract Deployed to Address ${inboxContract.options.address}`);
}

deploy();

