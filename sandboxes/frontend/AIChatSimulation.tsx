'use client';

import { useState } from 'react';

/**
 * AI Chat Simulation
 * 
 * This component provides a transparent simulation of AI chat interactions
 * for diagnostic and testing purposes.
 */
export default function AIChatSimulation() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiStatus, setApiStatus] = useState<'unknown' | 'available' | 'unavailable'>('unknown');

  const checkApiStatus = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/info`);
      if (response.ok) {
        setApiStatus('available');
        return true;
      } else {
        setApiStatus('unavailable');
        return false;
      }
    } catch (err) {
      setApiStatus('unavailable');
      return false;
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    setError('');
    const userMessage = input.trim();
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      
      // This is a simulation - in a real implementation, you'd have an AI endpoint
      // For now, we'll use the /api/info endpoint to demonstrate connectivity
      const response = await fetch(`${apiUrl}/api/info`);
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      
      // Simulate AI response based on user input
      let simulatedResponse = '';
      if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
        simulatedResponse = `Hello! I'm the AI Chat Simulation. This is a diagnostic sandbox connected to the backend API (${data.model_name}). How can I help you today?`;
      } else if (userMessage.toLowerCase().includes('blockchain') || userMessage.toLowerCase().includes('web3')) {
        simulatedResponse = `I can help with blockchain and Web3 questions! The backend is configured to use network: ${data.network}. This sandbox demonstrates transparent AI-blockchain integration.`;
      } else {
        simulatedResponse = `[Simulation Mode] I received your message: "${userMessage}". In a full implementation, I would process this using ${data.model_name}. This sandbox demonstrates the AI chat interface with backend connectivity.`;
      }

      setMessages(prev => [...prev, { role: 'assistant', content: simulatedResponse }]);
    } catch (err: any) {
      setError(`Failed to communicate with backend: ${err.message}`);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '[Error] Could not connect to backend API. Please ensure the backend is running.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            🤖 AI Chat Simulation Sandbox
          </h1>
          <p className="text-gray-600 mb-4">
            Test and validate AI chat interactions with transparent backend connectivity
          </p>

          <div className="flex gap-4 mb-4">
            <button
              onClick={checkApiStatus}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
            >
              Check API Status
            </button>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">Backend API:</span>
              <span
                className={`font-semibold ${
                  apiStatus === 'available'
                    ? 'text-green-600'
                    : apiStatus === 'unavailable'
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {apiStatus === 'available'
                  ? '✓ Available'
                  : apiStatus === 'unavailable'
                  ? '✗ Unavailable'
                  : 'Unknown'}
              </span>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Chat Interface</h2>
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="text-sm text-red-600 hover:text-red-800 font-semibold"
              >
                Clear Chat
              </button>
            )}
          </div>

          <div className="border border-gray-300 rounded-lg p-4 h-96 overflow-y-auto mb-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-20">
                <p>No messages yet. Start a conversation!</p>
                <p className="text-sm mt-2">Try: "Hello", "Tell me about blockchain"</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-100 ml-auto max-w-[80%]'
                        : 'bg-gray-200 mr-auto max-w-[80%]'
                    }`}
                  >
                    <div className="font-semibold text-sm mb-1">
                      {msg.role === 'user' ? 'You' : 'AI Assistant'}
                    </div>
                    <div className="text-gray-800">{msg.content}</div>
                  </div>
                ))}
                {loading && (
                  <div className="bg-gray-200 mr-auto max-w-[80%] p-3 rounded-lg">
                    <div className="font-semibold text-sm mb-1">AI Assistant</div>
                    <div className="text-gray-600">Typing...</div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Diagnostic Information
          </h2>
          
          <div className="space-y-4 text-sm">
            <div className="bg-gray-50 p-4 rounded border border-gray-200">
              <h3 className="font-semibold mb-2 text-gray-700">Configuration</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• Backend API URL: {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}</li>
                <li>• Model: {process.env.NEXT_PUBLIC_MODEL_NAME || 'GPT-5.1-Codex-Max'}</li>
                <li>• Messages: {messages.length}</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-900">💡 Sandbox Purpose</h3>
              <p className="text-blue-800 text-sm">
                This sandbox simulates AI chat interactions and demonstrates transparent
                communication with the backend API. Use it to validate AI integration,
                test message handling, and diagnose connectivity issues.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
