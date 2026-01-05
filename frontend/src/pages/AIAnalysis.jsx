import { useState } from 'react';
import { aiService } from '../services/aiService';
import Spinner from '../components/Spinner';

const AIAnalysis = () => {
  const [contractAddress, setContractAddress] = useState('');
  const [network, setNetwork] = useState('ethereum');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const data = await aiService.assessContractRisk(contractAddress, network);
      setResult(data);
    } catch (error) {
      setError(error.response?.data?.error || 'Analysis failed');
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level) => {
    switch (level) {
      case 'low':
        return 'text-green-600 bg-green-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'high':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">AI Contract Risk Analysis</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Contract Address</label>
              <input
                type="text"
                value={contractAddress}
                onChange={(e) => setContractAddress(e.target.value)}
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
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? 'Analyzing...' : 'Analyze Contract'}
            </button>
          </form>

          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
        </div>

        {loading && (
          <div className="bg-white rounded-lg shadow p-8">
            <Spinner />
            <p className="text-center mt-4 text-gray-600">Analyzing smart contract...</p>
          </div>
        )}

        {result && !loading && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-6">Analysis Results</h2>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Risk Level</h3>
              <span className={`px-4 py-2 rounded-lg font-bold text-lg ${getRiskColor(result.riskAssessment.riskLevel)}`}>
                {result.riskAssessment.riskLevel.toUpperCase()}
              </span>
              <p className="mt-2 text-gray-600">
                Confidence: {(result.riskAssessment.confidence * 100).toFixed(1)}%
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Probability Distribution</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Low Risk</span>
                    <span>{(result.riskAssessment.probabilities.low * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${result.riskAssessment.probabilities.low * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Medium Risk</span>
                    <span>{(result.riskAssessment.probabilities.medium * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: `${result.riskAssessment.probabilities.medium * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span>High Risk</span>
                    <span>{(result.riskAssessment.probabilities.high * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: `${result.riskAssessment.probabilities.high * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {result.riskAssessment.analysis.insights.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Key Insights</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {result.riskAssessment.analysis.insights.map((insight, index) => (
                    <li key={index}>{insight}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Recommendation</h3>
              <p className="text-gray-700">{result.riskAssessment.analysis.recommendation}</p>
            </div>

            {result.analysis && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-2">Contract Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Code Size:</span>
                    <span className="ml-2 font-medium">{result.analysis.codeSize} bytes</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Complexity:</span>
                    <span className="ml-2 font-medium">{(result.analysis.complexity * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAnalysis;
