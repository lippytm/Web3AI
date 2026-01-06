export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Web3AI</h1>
        <p className="text-xl text-gray-600 mb-8">
          AI-powered Web3 Application Starter
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">🤖 AI Integration</h2>
            <p className="text-gray-600">
              Powered by OpenAI GPT-5.1-Codex-Max for intelligent features
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">⛓️ Web3 Ready</h2>
            <p className="text-gray-600">
              Built with ethers, viem, and wagmi for blockchain integration
            </p>
          </div>
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">🚀 Full Stack</h2>
            <p className="text-gray-600">
              Next.js frontend with FastAPI backend and Hardhat contracts
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
