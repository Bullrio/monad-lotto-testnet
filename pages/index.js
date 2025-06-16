import Head from 'next/head';

import { useState } from 'react';
import { ethers } from 'ethers';

import { connectWallet } from '../utils/wallet';


export default function Home() {
  const [address, setAddress] = useState(null);
  const [txPending, setTxPending] = useState(false);

  async function handleJoin() {
    if (!window.ethereum || !address) return;

    try {
      setTxPending(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: "0xdef02d54BCEaBe1EEa6b6D0219D7F6a00f82152f",
        value: ethers.parseEther("1.0"),
      });

      await tx.wait();
      alert("Join Success! Transaction confirmed.");
    } catch (err) {
      console.error(err);
      alert("Transaction failed.");
    } finally {
      setTxPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-green-900 text-white p-4">
      <Head>
        <title>Monad Lotto</title>
      </Head>
      <header className="flex justify-between items-center py-4">
  {!address ? (
    <button
      onClick={() => connectWallet(setAddress)}
      className="bg-purple-600 text-white px-4 py-2 rounded-md"
    >
      Connect Wallet
    </button>
  ) : (
    <p className="text-sm text-green-400">Connected: {address.slice(0, 6)}...{address.slice(-4)}</p>
  )}

        <div className="text-xl font-bold">MONAD LOTTO</div>
        <button className="bg-purple-600 px-4 py-2 rounded">Connect Wallet</button>
      </header>

      <section className="my-6 bg-gray-900 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Pick Your Lucky Number (1–50)</h2>
        <div className="grid grid-cols-10 gap-2 text-center">
          {[...Array(50)].map((_, i) => (
            <button key={i} className="bg-gray-800 rounded py-2">{i+1}</button>
          ))}
        </div>
        <div className="mt-4 flex gap-4">
          <button onClick={handleJoin} disabled={txPending} className={`flex-1 py-2 rounded ${txPending ? "bg-gray-600" : "bg-green-600"}`}>{txPending ? "Pending..." : "Join Now (1 MONAD)"}</button>
          <button className="bg-purple-700 flex-1 py-2 rounded">Auto Pick</button>
        </div>
      </section>

      <section className="my-6 bg-gray-900 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Reward Pool</h2>
        <div className="text-yellow-400 text-3xl mt-2">15.00 MONAD</div>
        <div className="text-green-400">Winner's Prize (75%): 11.25 MONAD</div>
        <div className="text-purple-400">To Wallet Pool (25%): 3.75 MONAD</div>
      </section>

      <section className="my-6 bg-gray-900 p-4 rounded-lg">
        <h2 className="text-lg font-semibold">Time Left</h2>
        <div className="text-2xl text-green-400 mt-2">00:59:58</div>
        <p className="text-sm">Until draw starts</p>
      </section>

      <footer className="text-xs text-center text-gray-400 mt-8">Testnet Edition - Built with ❤️</footer>
    </div>
  );
}