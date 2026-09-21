const platformHighlights = [
  {
    title: "🤖 AI Integration",
    description: "Powered by OpenAI GPT-5.1-Codex-Max for intelligent features",
  },
  {
    title: "⛓️ Web3 Ready",
    description: "Built with ethers, viem, and wagmi for blockchain integration",
  },
  {
    title: "🚀 Full Stack",
    description: "Next.js frontend with FastAPI backend and Hardhat contracts",
  },
];

const assistantRoles = [
  {
    name: "AI Jarvis Assistant",
    focus: "Acts as the command-center copilot for Web3AI workflows and decision support.",
  },
  {
    name: "Engineering Manager",
    focus: "Coordinates implementation priorities, system readiness, and engineering execution.",
  },
  {
    name: "Communications Manager",
    focus: "Shapes launch messaging, project updates, and ecosystem-facing communication.",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24">
      <div className="max-w-6xl text-center">
        <h1 className="mb-4 text-4xl font-bold">Web3AI</h1>
        <p className="mb-8 text-xl text-gray-600">
          AI-powered Web3 Application Starter
        </p>

        <div className="mb-10 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {platformHighlights.map((highlight) => (
            <div key={highlight.title} className="rounded-lg border p-6">
              <h2 className="mb-2 text-2xl font-semibold">{highlight.title}</h2>
              <p className="text-gray-600">{highlight.description}</p>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-8 text-left shadow-sm">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-semibold">AI Team Roles</h2>
            <p className="mt-2 text-gray-600">
              Specialized assistants for product direction, engineering flow, and communications.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {assistantRoles.map((role) => (
              <li key={role.name} className="list-none">
                <article className="h-full rounded-xl border bg-white p-5">
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{role.name}</h3>
                <p className="text-gray-600">{role.focus}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
