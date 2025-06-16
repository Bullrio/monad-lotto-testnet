export const MONAD_TESTNET_PARAMS = {
  chainId: '0x100', // Ganti jika berbeda
  chainName: 'Monad Testnet',
  nativeCurrency: {
    name: 'MONAD',
    symbol: 'MONAD',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.testnet.monad.xyz'],
  blockExplorerUrls: ['https://explorer.testnet.monad.xyz'],
};

export async function connectWallet(setAddress) {
  if (typeof window.ethereum === 'undefined') {
    alert("MetaMask not detected. Please install it first.");
    return;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [MONAD_TESTNET_PARAMS],
    });

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAddress(accounts[0]);
  } catch (err) {
    console.error("Wallet connection failed:", err);
  }
}