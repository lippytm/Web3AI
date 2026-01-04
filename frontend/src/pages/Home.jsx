import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Web3AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Full Stack AI Application with Blockchain Integration
          </p>
          {!isAuthenticated && (
            <div className="space-x-4">
              <Link
                to="/register"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition inline-block"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 transition inline-block"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
            <p className="text-gray-600">
              JWT-based authentication with bcrypt encryption for maximum security
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
            <p className="text-gray-600">
              TensorFlow.js integration for smart contract risk assessment
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="text-4xl mb-4">⛓️</div>
            <h3 className="text-xl font-semibold mb-2">Blockchain Integration</h3>
            <p className="text-gray-600">
              Seamless Web3 connectivity with ethers.js for blockchain interactions
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h4 className="font-semibold">React Frontend</h4>
                <p className="text-gray-600 text-sm">Modern UI with TailwindCSS</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h4 className="font-semibold">Node.js Backend</h4>
                <p className="text-gray-600 text-sm">Express.js API with Sequelize ORM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h4 className="font-semibold">PostgreSQL Database</h4>
                <p className="text-gray-600 text-sm">Robust data persistence</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-green-500 text-xl">✓</span>
              <div>
                <h4 className="font-semibold">Docker Support</h4>
                <p className="text-gray-600 text-sm">Easy deployment and scaling</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
