const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');
const config = require('./config');
const ccpPath = path.resolve(config.path, "connection-org1.json");
const walletPath = path.resolve(config.path, 'wallet');
const { userId } = require(path.resolve(config.path, 'user.json'));
const log = require("electron-log");

console.log = log.info;


async function getFabricAuth() {
    const wallet = new FileSystemWallet(walletPath);
    const userExists = await wallet.exists('user1');
    if (!userExists) {
        console.log('An identity for the user "user wallet" does not exist in the wallet');
        return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: false } });
    console.log('gateway connect success.')
    
    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('identity');

    console.log('create the contract.')
    let result;

    try {
        result = await contract.submitTransaction('getUserIdentity', userId);   
        console.log('submit transaction success.')
    } catch (error) {
        throw new Error("submit transaction Error.")
    }

    await gateway.disconnect();

    result = result.toString();
    console.log(`------------------ Transaction has been evaluated.`);

    try {
        return JSON.parse(result);
    } catch (error) {
        console.error(error);
        return result;
    }
}

module.exports = getFabricAuth;