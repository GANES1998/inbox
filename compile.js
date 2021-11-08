const path = require('path')
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const solSource = fs.readFileSync(inboxPath, 'utf8');

const CONTRACT = 'Inbox';

const extractContract = (compliedSource, contractName) => compliedSource.contracts[`:${contractName}`];

const compliedSource = solc.compile(solSource);

let contract = extractContract(compliedSource, CONTRACT);

module.exports = contract;


