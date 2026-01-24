'use client';

import { useState } from 'react';

/**
 * Web3 Interaction Sandbox
 * 
 * This component provides a transparent playground for testing
 * Web3 interactions and blockchain connectivity.
 */
export default function Web3Sandbox() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [connected, setConnected] = useState(false);
  const [chainId, setChainId] = useState('');
  const [error, setError] = useState('');

  const connectWallet = async () => {
    setError('');
    try {
      if (typeof window.ethereum === 'undefined') {
        setError('Please install MetaMask or another Web3 wallet');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const account = accounts[0];
      setAddress(account);
      setConnected(true);

      // Get chain ID
      const chain = await window.ethereum.request({ method: 'eth_chainId' });
      setChainId(parseInt(chain, 16).toString());

      // Get balance
      const balanceHex = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [account, 'latest'],
      });
      const balanceWei = parseInt(balanceHex, 16);
      const balanceEth = (balanceWei / 1e18).toFixed(4);
      setBalance(balanceEth);
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    }
  };

  const disconnectWallet = () => {
    setAddress('');
    setBalance('');
    setConnected(false);
    setChainId('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            🔗 Web3 Interaction Sandbox
          </h1>
          <p className="text-gray-600 mb-6">
            Test and validate Web3 wallet connections with full transparency
          </p>

          <div className="space-y-4">
            {!connected ? (
              <button
                onClick={connectWallet}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Connect Wallet
              </button>
            ) : (
              <button
                onClick={disconnectWallet}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Disconnect Wallet
              </button>
            )}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                <strong>Error:</strong> {error}
              </div>
            )}

            {connected && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                <div>
                  <strong className="text-green-900">Status:</strong>
                  <span className="ml-2 text-green-700">✓ Connected</span>
                </div>
                <div>
                  <strong className="text-green-900">Address:</strong>
                  <code className="ml-2 text-sm bg-gray-100 px-2 py-1 rounded">
                    {address}
                  </code>
                </div>
                <div>
                  <strong className="text-green-900">Chain ID:</strong>
                  <span className="ml-2 text-green-700">{chainId}</span>
                </div>
                <div>
                  <strong className="text-green-900">Balance:</strong>
                  <span className="ml-2 text-green-700">{balance} ETH</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Diagnostic Information
          </h2>
          
          <div className="space-y-4 text-sm">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-700">
                Browser Support
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>
                  • Web3 Provider:{' '}
                  {typeof window !== 'undefined' && typeof window.ethereum !== 'undefined'
                    ? '✓ Detected'
                    : '✗ Not detected'}
                </li>
                <li>
                  • Provider Name:{' '}
                  {typeof window !== 'undefined' && window.ethereum
                    ? (window.ethereum as any).isMetaMask
                      ? 'MetaMask'
                      : 'Other'
                    : 'None'}
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-700">
                Connection Details
              </h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Connection Status: {connected ? 'Connected' : 'Disconnected'}</li>
                <li>• Network ID: {chainId || 'N/A'}</li>
                <li>
                  • Network Name:{' '}
                  {chainId === '1'
                    ? 'Mainnet'
                    : chainId === '11155111'
                    ? 'Sepolia'
                    : chainId === '5'
                    ? 'Goerli'
                    : chainId === '1337'
                    ? 'Hardhat Local'
                    : chainId || 'Unknown'}
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-900">
                💡 Sandbox Purpose
              </h3>
              <p className="text-blue-800 text-sm">
                This sandbox provides transparent testing of Web3 wallet connections,
                allowing you to validate blockchain interactions and diagnose
                connectivity issues in a safe environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
