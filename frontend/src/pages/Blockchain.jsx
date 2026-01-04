import { useState } from 'react';
import { blockchainService } from '../services/blockchainService';
import Spinner from '../components/Spinner';

const Blockchain = () => {
  const [address, setAddress] = useState('');
  const [txHash, setTxHash] = useState('');
  const [network, setNetwork] = useState('ethereum');
  const [balanceResult, setBalanceResult] = useState(null);
  const [txResult, setTxResult] = useState(null);
  const [loading, setLoading] = useState({ balance: false, tx: false });
  const [error, setError] = useState({ balance: '', tx: '' });

  const handleCheckBalance = async (e) => {
    e.preventDefault();
    setError({ ...error, balance: '' });
    setBalanceResult(null);
    setLoading({ ...loading, balance: true });

    try {
      const data = await blockchainService.getBalance(address, network);
      setBalanceResult(data);
    } catch (error) {
      setError({ ...error, balance: error.response?.data?.error || 'Failed to fetch balance' });
    } finally {
      setLoading({ ...loading, balance: false });
    }
  };

  const handleCheckTransaction = async (e) => {
    e.preventDefault();
    setError({ ...error, tx: '' });
    setTxResult(null);
    setLoading({ ...loading, tx: true });

    try {
      const data = await blockchainService.getTransaction(txHash, network);
      setTxResult(data);
    } catch (error) {
      setError({ ...error, tx: error.response?.data?.error || 'Failed to fetch transaction' });
    } finally {
      setLoading({ ...loading, tx: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">Blockchain Explorer</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Balance Checker */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Check Balance</h2>
            <form onSubmit={handleCheckBalance} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Network</label>
                <select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="sepolia">Sepolia (Testnet)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading.balance}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {loading.balance ? 'Checking...' : 'Check Balance'}
              </button>
            </form>

            {error.balance && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error.balance}
              </div>
            )}

            {balanceResult && (
              <div className="mt-4 bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Balance</p>
                <p className="text-2xl font-bold text-green-600">
                  {balanceResult.balance} {balanceResult.unit}
                </p>
                <p className="text-xs text-gray-500 mt-2 break-all">
                  {balanceResult.address}
                </p>
              </div>
            )}
          </div>

          {/* Transaction Checker */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Check Transaction</h2>
            <form onSubmit={handleCheckTransaction} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Transaction Hash</label>
                <input
                  type="text"
                  value={txHash}
                  onChange={(e) => setTxHash(e.target.value)}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Network</label>
                <select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="ethereum">Ethereum</option>
                  <option value="polygon">Polygon</option>
                  <option value="sepolia">Sepolia (Testnet)</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading.tx}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400"
              >
                {loading.tx ? 'Checking...' : 'Check Transaction'}
              </button>
            </form>

            {error.tx && (
              <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error.tx}
              </div>
            )}

            {txResult && (
              <div className="mt-4 bg-purple-50 p-4 rounded-lg space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">From:</span>
                  <p className="font-mono text-xs break-all">{txResult.transaction.from}</p>
                </div>
                <div>
                  <span className="text-gray-600">To:</span>
                  <p className="font-mono text-xs break-all">{txResult.transaction.to}</p>
                </div>
                <div>
                  <span className="text-gray-600">Value:</span>
                  <p className="font-medium">{txResult.transaction.value} Wei</p>
                </div>
                {txResult.transaction.blockNumber && (
                  <div>
                    <span className="text-gray-600">Block:</span>
                    <p className="font-medium">{txResult.transaction.blockNumber}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blockchain;
