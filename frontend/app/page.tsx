import { getConfig } from "../lib/config";

const bundledTools = [
  {
    name: "Jarvis Chat Workspace",
    description: "Centralize strategy, ideation, and execution with a single assistant experience.",
  },
  {
    name: "Prompt Lab",
    description: "Iterate on reusable prompts for growth, research, code, and operations.",
  },
  {
    name: "Code Copilot",
    description: "Draft application logic, contract helpers, and API scaffolding faster.",
  },
  {
    name: "Document Analyzer",
    description: "Summarize specs, contracts, proposals, and long-form research instantly.",
  },
  {
    name: "Research Briefs",
    description: "Turn open-ended questions into short market, product, or token insights.",
  },
  {
    name: "Image Studio",
    description: "Create fast concept visuals for products, campaigns, and launch assets.",
  },
  {
    name: "Voice Notes",
    description: "Convert spoken ideas into structured tasks, briefs, and assistant-ready prompts.",
  },
  {
    name: "Workflow Builder",
    description: "Package repeatable AI automations for support, growth, and creator operations.",
  },
] as const;

const launchPillars = [
  "AI assistant branding ready for product launches",
  "Free tool catalog aligned to creator and builder workflows",
  "Web3-compatible messaging for wallets, apps, and smart contracts",
];

export default function Home() {
  const config = getConfig();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white md:px-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <section className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-slate-900 via-slate-950 to-cyan-950/60 p-8 shadow-2xl shadow-cyan-950/30 md:p-12">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm font-medium text-cyan-200">
              AI Jarvis Assistant + free AI toolkit
            </div>
            <div className="max-w-3xl space-y-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
                {config.NEXT_PUBLIC_ASSISTANT_NAME}
              </h1>
              <p className="text-lg text-slate-300 md:text-xl">
                Launch a polished AI copilot experience with the bundled free tools needed for chat,
                prompting, research, documents, images, voice capture, and workflow automation.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {launchPillars.map((pillar) => (
                <div
                  key={pillar}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200"
                >
                  {pillar}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full border border-white/10 px-4 py-2">
                Default model: {config.NEXT_PUBLIC_MODEL_NAME}
              </span>
              <span className="rounded-full border border-white/10 px-4 py-2">
                Ready for Web3AI frontend + FastAPI backend
              </span>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold text-white">Bundled free AI tools</h2>
            <p className="max-w-3xl text-slate-300">
              Everything below ships as part of the Jarvis assistant experience so teams can start
              creating, researching, and automating immediately.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {bundledTools.map((tool) => (
              <article
                key={tool.name}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg shadow-slate-950/20"
              >
                <h3 className="text-lg font-semibold text-cyan-200">{tool.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{tool.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold text-white">Assistant-ready backend</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              The FastAPI layer now exposes assistant metadata and bundled tool information for APIs,
              dashboards, and integrations.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold text-white">Creator-first toolkit</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Use Jarvis to move from rough ideas to prompts, briefs, visuals, and workflows without
              paid add-ons.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="text-xl font-semibold text-white">Web3 launch support</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Pair AI operations with wallet flows, blockchain connectivity, and smart contract
              features from the existing Web3AI stack.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
