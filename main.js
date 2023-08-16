const { Web3 } = require('web3');

const ethereumjsUtil = require('ethereumjs-util');
const fetch = require('node-fetch'); // You might need to install the 'node-fetch' library

const ethNodeUrl = 'https://mainnet.infura.io/v3/1a351d54459e4c17b1a3e9c05b6c3ff4';
const web3 = new Web3(ethNodeUrl);

async function fetchWalletInfo(walletAddress, minBalance) {
  try {
    const balance = await web3.eth.getBalance(walletAddress);
    const transactionCount = await web3.eth.getTransactionCount(walletAddress);

    console.log('Wallet Address:', walletAddress);
    console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');
    console.log('Transaction Count:', transactionCount);

    if (balance >= web3.utils.toWei(minBalance.toString(), 'ether')) {
      console.log('This wallet meets the minimum balance criteria.');
    } else {
      console.log('This wallet does not meet the minimum balance criteria.');
    }
  } catch (error) {
    console.error('Error fetching wallet info:', error);
  }
}

async function fetchRandomWalletsInfo() {
  const numRandomWallets = 5;
  const minBalance = 20; // Specify the minimum balance in ETH

  for (let i = 0; i < numRandomWallets; i++) {
    const randomPrivateKey = ethereumjsUtil.sha3(Math.random().toString());
    const walletAddressBuffer = ethereumjsUtil.privateToAddress(randomPrivateKey);
    const walletAddress = ethereumjsUtil.bufferToHex(walletAddressBuffer);
    await fetchWalletInfo(walletAddress, minBalance);
    console.log('------------------------');
  }
}

fetchRandomWalletsInfo();