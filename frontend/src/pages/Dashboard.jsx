import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWeb3 } from '../context/Web3Context';
import { blockchainService } from '../services/blockchainService';
import Spinner from '../components/Spinner';

const Dashboard = () => {
  const { user } = useAuth();
  const { account, isConnected, getBalance } = useWeb3();
  const [balance, setBalance] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [account]);

  const loadData = async () => {
    try {
      if (isConnected && account) {
        const bal = await getBalance();
        setBalance(bal);
      }
      
      const data = await blockchainService.getUserInteractions();
      setInteractions(data.interactions || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-2">Username</h3>
            <p className="text-2xl font-semibold">{user?.username}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-2">Email</h3>
            <p className="text-lg">{user?.email}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-500 text-sm mb-2">Wallet Balance</h3>
            {isConnected ? (
              <p className="text-2xl font-semibold">{balance ? `${parseFloat(balance).toFixed(4)} ETH` : 'Loading...'}</p>
            ) : (
              <p className="text-gray-400">Connect wallet to view</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Interactions</h2>
          {interactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Method</th>
                    <th className="px-4 py-2 text-left">Network</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Transaction Hash</th>
                    <th className="px-4 py-2 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {interactions.map((interaction) => (
                    <tr key={interaction.id} className="border-t">
                      <td className="px-4 py-2">{interaction.method}</td>
                      <td className="px-4 py-2">{interaction.network}</td>
                      <td className="px-4 py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          interaction.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          interaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {interaction.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 font-mono text-sm">
                        {interaction.transactionHash.slice(0, 10)}...
                      </td>
                      <td className="px-4 py-2 text-sm">
                        {new Date(interaction.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No interactions yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
