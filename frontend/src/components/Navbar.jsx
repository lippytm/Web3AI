import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWeb3 } from '../context/Web3Context';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { account, isConnected, connectWallet, disconnectWallet } = useWeb3();

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert(error.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Web3AI
          </Link>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition">
                  Dashboard
                </Link>
                <Link to="/ai-analysis" className="hover:text-blue-200 transition">
                  AI Analysis
                </Link>
                <Link to="/blockchain" className="hover:text-blue-200 transition">
                  Blockchain
                </Link>
                <span className="text-sm">
                  {user?.username}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 transition"
                >
                  Register
                </Link>
              </>
            )}
            
            {isConnected ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm bg-green-500 px-3 py-1 rounded">
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </span>
                <button
                  onClick={disconnectWallet}
                  className="bg-gray-700 hover:bg-gray-800 px-3 py-1 rounded text-sm transition"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnectWallet}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded font-semibold transition"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
