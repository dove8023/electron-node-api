const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const dir = './config';
const ccpPath = path.resolve(dir, "connection-org1.json");
const walletPath = path.resolve(dir, 'wallet');
const { userId } = require(path.resolve(dir, 'user.json'));


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

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('identity');

    const result = await contract.submitTransaction('getUserIdentity', userId);

    console.log('---------------');
    console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

    await gateway.disconnect();

    return result.toString();
}

module.exports = getFabricAuth;