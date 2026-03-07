'use client';

import { useState } from 'react';

type StepId =
  | 'step-0'
  | 'step-a1'
  | 'step-a2'
  | 'step-b1'
  | 'step-b2'
  | 'step-b3'
  | 'dash-lead'
  | 'dash-member';

const POD_CODE = 'FY-8821';

export default function Onboarding() {
  const [step, setStep] = useState<StepId>('step-0');
  const [copied, setCopied] = useState(false);
  const [memberSuccess, setMemberSuccess] = useState(false);

  const goTo = (id: StepId) => {
    setStep(id);
  };

  const handleCopyCode = async () => {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(POD_CODE);
      }
    } catch {
      // ignore clipboard errors, still show copied state
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFinishLead = () => {
    goTo('dash-lead');
  };

  const handleSuccessMember = () => {
    setMemberSuccess(true);
    setTimeout(() => {
      goTo('dash-member');
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="grain" />

      {/* ONBOARDING WRAPPER */}
      <main className="w-full max-w-5xl">
        {/* PAGE 0: GATEKEEPER */}
        <div
          className={`step-container flex-col ${
            step === 'step-0' ? 'active' : ''
          }`}
        >
          <h1 className="text-5xl font-extrabold mb-12 tracking-tighter embossed-text text-center italic">
            Welcome to Fylo
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              onClick={() => goTo('step-a1')}
              className="vellum-card p-12 cursor-pointer group"
            >
              <div className="mono text-[10px] opacity-30 mb-4">
                TYPE: ARCHITECT
              </div>
              <h2 className="text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                I am a Team Lead
              </h2>
              <p className="text-accent/50 text-sm leading-relaxed mb-8">
                Set up your pod and routing rules. Design the workflow
                infrastructure for your unit.
              </p>
              <div className="h-[1px] w-full bg-white/10 group-hover:bg-white/40 transition-colors" />
            </div>

            <div
              onClick={() => goTo('step-b1')}
              className="vellum-card p-12 cursor-pointer group"
            >
              <div className="mono text-[10px] opacity-30 mb-4">
                TYPE: SPECIALIST
              </div>
              <h2 className="text-3xl font-bold mb-2 group-hover:translate-x-2 transition-transform">
                I am a Team Member
              </h2>
              <p className="text-accent/50 text-sm leading-relaxed mb-8">
                Join your team and view your queue. Sync your skills with the
                pod logic.
              </p>
              <div className="h-[1px] w-full bg-white/10 group-hover:bg-white/40 transition-colors" />
            </div>
          </div>
        </div>

        {/* FUNNEL A: TEAM LEAD */}
        {/* A1: Profile */}
        <div
          className={`step-container flex-col max-w-2xl mx-auto ${
            step === 'step-a1' ? 'active' : ''
          }`}
        >
          <div className="mb-10">
            <span className="mono text-[10px] opacity-40">
              01 // CONTEXTUAL_PROFILE
            </span>
            <h2 className="text-4xl font-black italic mt-2">
              PROFESSIONAL CONTEXT
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mono text-[10px] uppercase mb-2 opacity-50">
                  Legal Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="debossed-input p-4 rounded mono text-sm"
                />
              </div>
              <div className="flex flex-col">
                <label className="mono text-[10px] uppercase mb-2 opacity-50">
                  Agency / Entity
                </label>
                <input
                  type="text"
                  placeholder="Acme Corp"
                  className="debossed-input p-4 rounded mono text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mono text-[10px] uppercase mb-2 opacity-50">
                Work Email
              </label>
              <input
                type="email"
                placeholder="john@acme.com"
                className="debossed-input p-4 rounded mono text-sm"
              />
            </div>

            <div className="pt-4">
              <div className="upload-zone p-12 rounded flex flex-col items-center justify-center text-center">
                <div className="mb-4 opacity-40">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                  </svg>
                </div>
                <div className="mono text-xs font-bold uppercase mb-1">
                  Upload Executive Resume / PDF
                </div>
                <div className="text-[10px] opacity-40">
                  DRAG AND DROP FILTRATION
                </div>
              </div>
              <div className="mt-4 p-4 bg-white/5 border-l-2 border-white/20">
                <p className="text-[11px] leading-relaxed italic opacity-70">
                  "We use your resume to understand your management style and
                  domain expertise to suggest better routing rules."
                </p>
              </div>
            </div>

            <div className="pt-8 flex justify-between items-center">
              <button
                onClick={() => goTo('step-0')}
                className="mono text-[10px] opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
              >
                Back
              </button>
              <button
                onClick={() => goTo('step-a2')}
                className="btn-primary px-12"
              >
                Initialize Pod
              </button>
            </div>
          </div>
        </div>

        {/* A2: Pod Key */}
        <div
          className={`step-container flex-col items-center text-center max-w-2xl mx-auto ${
            step === 'step-a2' ? 'active' : ''
          }`}
        >
          <div className="mb-10">
            <span className="mono text-[10px] opacity-40">
              02 // ACCESS_KEY_GEN
            </span>
            <h2 className="text-4xl font-black italic mt-2">YOUR POD KEY</h2>
          </div>

          <div className="vellum-card p-16 w-full mb-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white/20" />
            <div className="mono text-8xl font-black tracking-tighter embossed-text mb-4">
              {POD_CODE}
            </div>
            <div className="mono text-[10px] opacity-40 uppercase">
              Active Cryptographic Link
            </div>
          </div>

          <p className="text-accent/60 text-sm mb-10 max-w-md leading-relaxed">
            Give this code to your 5–20 person pod. As they join, you’ll see
            them appear in your Work Distribution Visibility view.
          </p>

          <div className="flex flex-col w-full gap-4">
            <button
              onClick={handleCopyCode}
              className="btn-primary w-full"
            >
              {copied ? 'COPIED TO CLIPBOARD' : 'Copy Pod Code'}
            </button>
            <div className="grid grid-cols-2 gap-4">
              <button className="vellum-card py-4 mono text-[10px] uppercase tracking-widest hover:bg-white/10">
                Share via Slack
              </button>
              <button className="vellum-card py-4 mono text-[10px] uppercase tracking-widest hover:bg-white/10">
                WhatsApp
              </button>
            </div>
            <button
              onClick={handleFinishLead}
              className="mt-12 mono text-[10px] opacity-40 hover:opacity-100"
            >
              ENTER DASHBOARD →
            </button>
          </div>
        </div>

        {/* FUNNEL B: TEAM MEMBER */}
        {/* B1: Personal Setup */}
        <div
          className={`step-container flex-col max-w-2xl mx-auto ${
            step === 'step-b1' ? 'active' : ''
          }`}
        >
          <div className="mb-10">
            <span className="mono text-[10px] opacity-40">
              01 // SPECIALIST_AUTH
            </span>
            <h2 className="text-4xl font-black italic mt-2">PERSONAL SETUP</h2>
          </div>

          <div className="space-y-6">
            <div className="flex flex-col">
              <label className="mono text-[10px] uppercase mb-2 opacity-50">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Maria Rodriguez"
                className="debossed-input p-4 rounded mono text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label className="mono text-[10px] uppercase mb-2 opacity-50">
                Specialist Email
              </label>
              <input
                type="email"
                placeholder="m.rodriguez@fylo.com"
                className="debossed-input p-4 rounded mono text-sm"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="primary-designation"
                className="mono text-[10px] uppercase mb-2 opacity-50"
              >
                Primary Designation
              </label>
              <select
                id="primary-designation"
                className="debossed-input p-4 rounded mono text-sm appearance-none"
              >
                <option>Technical Support</option>
                <option>Billing & Recovery</option>
                <option>Tier 1 Response</option>
                <option>Escalations Lead</option>
              </select>
            </div>

            <div className="pt-8 flex justify-between items-center">
              <button
                onClick={() => goTo('step-0')}
                className="mono text-[10px] opacity-40 hover:opacity-100 uppercase tracking-widest"
              >
                Back
              </button>
              <button
                onClick={() => goTo('step-b2')}
                className="btn-primary px-12"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* B2: Skill Mapping */}
        <div
          className={`step-container flex-col max-w-2xl mx-auto ${
            step === 'step-b2' ? 'active' : ''
          }`}
        >
          <div className="mb-10">
            <span className="mono text-[10px] opacity-40">
              02 // SKILL_MAPPING
            </span>
            <h2 className="text-4xl font-black italic mt-2">EXPERIENCE IMPORT</h2>
          </div>

          <div className="upload-zone p-20 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer">
            <div className="mb-6 opacity-40">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div className="mono text-sm font-bold uppercase mb-2">
              Upload Resume or LinkedIn PDF
            </div>
            <div className="text-[10px] opacity-40 max-w-xs">
              Drag files here to synchronize your expertise with the pod routing
              logic.
            </div>
          </div>

          <div className="mt-8 relative group">
            <div className="vellum-card p-6 flex items-start gap-4">
              <div className="text-white/40 pt-1">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <p className="text-xs leading-relaxed opacity-60 italic">
                "Fylo reads your experience so the Lead can route tickets that
                match your actual skills, reducing 'random' escalations."
              </p>
            </div>
            <div className="absolute -top-3 left-6 mono text-[9px] bg-white text-black px-2 py-0.5 font-bold">
              WORKER_BENEFIT
            </div>
          </div>

          <div className="pt-12 flex justify-between items-center">
            <button
              onClick={() => goTo('step-b1')}
              className="mono text-[10px] opacity-40 hover:opacity-100 uppercase tracking-widest"
            >
              Back
            </button>
            <button
              onClick={() => goTo('step-b3')}
              className="btn-primary px-12"
            >
              Proceed to Pod
            </button>
          </div>
        </div>

        {/* B3: Join Pod */}
        <div
          className={`step-container flex-col items-center text-center max-w-2xl mx-auto ${
            step === 'step-b3' ? 'active' : ''
          }`}
        >
          <div className="mb-10">
            <span className="mono text-[10px] opacity-40">
              03 // POD_JOIN_SEQUENCE
            </span>
            <h2 className="text-4xl font-black italic mt-2">ENTER POD CODE</h2>
          </div>

          <div className="w-full mb-12">
            <input
              type="text"
              maxLength={6}
              placeholder="______"
              className="pod-code-input debossed-input w-full p-10 rounded mono placeholder:opacity-10"
            />
          </div>

          <button
            onClick={handleSuccessMember}
            className="btn-primary w-full py-6 text-xl"
          >
            CONNECT TO POD
          </button>

          {memberSuccess && (
            <div className="mt-12 vellum-card p-12 w-full animate-bounce">
              <div className="text-2xl font-bold mb-2">SUCCESS!</div>
              <p className="mono text-xs opacity-60">
                You have joined John Doe’s Team. Redirecting to your Focused
                Inbox...
              </p>
            </div>
          )}
        </div>

        {/* HYBRID DASHBOARD STATES (SIMULATED) */}
        <div
          className={`step-container flex-col ${
            step === 'dash-lead' ? 'active' : ''
          }`}
        >
          <div className="vellum-card p-8 border-l-4 border-l-green-500 max-w-md">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <polyline points="17 11 19 13 23 9" />
                </svg>
              </div>
              <div>
                <div className="font-bold">Maria has joined.</div>
                <div className="mono text-[10px] opacity-50 uppercase tracking-widest">
                  Pod Synchronization Active
                </div>
              </div>
            </div>
            <p className="text-xs opacity-70 italic leading-relaxed">
              Her skill set (Refunds/Shopify) has been automatically added to
              the routing logic. 14 tickets redistributed.
            </p>
          </div>
        </div>

        <div
          className={`step-container flex-col items-center justify-center text-center min-h-[40vh] ${
            step === 'dash-member' ? 'active' : ''
          }`}
        >
          <div className="mono text-[10px] opacity-40 mb-6 tracking-[0.5em] uppercase">
            Status: Connected / Synced
          </div>
          <h1 className="text-6xl font-black italic mb-4">Welcome, Maria.</h1>
          <p className="text-accent/50 max-w-sm mb-12 leading-relaxed">
            You are now synced with John Doe. Waiting for routed tickets based
            on your Specialist Profile...
          </p>
          <div className="w-64 h-1 bg-white/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-white w-1/3 animate-[loading_2s_infinite]" />
          </div>
        </div>
      </main>

      <style jsx global>{`
        :root {
          --carbon: #0f0f0f;
          --vellum: rgba(255, 255, 255, 0.03);
          --vellum-border: rgba(255, 255, 255, 0.08);
          --accent: #e2e2e2;
        }

        body {
          background-color: var(--carbon);
          color: var(--accent);
          font-family: 'Inter', sans-serif;
          overflow: hidden;
          background-image: radial-gradient(
              circle at 50% 50%,
              rgba(40, 40, 40, 0.5) 0%,
              transparent 80%
            ),
            url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
        }

        .mono {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Embossed Vellum Effect */
        .vellum-card {
          background: var(--vellum);
          backdrop-filter: blur(12px);
          border: 1px solid var(--vellum-border);
          border-radius: 4px;
          box-shadow:
            10px 10px 30px rgba(0, 0, 0, 0.5),
            inset 1px 1px 0px rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .vellum-card:hover {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-2px);
        }

        /* Embossed Typography */
        .embossed-text {
          color: rgba(255, 255, 255, 0.8);
          text-shadow:
            -1px -1px 0px rgba(0, 0, 0, 0.8),
            1px 1px 0px rgba(255, 255, 255, 0.1);
        }

        /* Debossed Inputs */
        .debossed-input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 2px 2px 8px rgba(0, 0, 0, 0.8);
          color: #fff;
          transition: border-color 0.3s ease;
        }

        .debossed-input:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Grain Overlay */
        .grain {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .step-container {
          display: none;
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .step-container.active {
          display: flex;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pod-code-input {
          letter-spacing: 0.5em;
          font-size: 2.5rem;
          text-align: center;
          font-weight: 800;
        }

        .btn-primary {
          background: #fff;
          color: #000;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          padding: 1rem 2rem;
          transition: all 0.3s ease;
          clip-path: polygon(0 0, 95% 0, 100% 25%, 100% 100%, 5% 100%, 0 75%);
        }

        .btn-primary:hover {
          background: #ccc;
          transform: scale(1.02);
        }

        .upload-zone {
          border: 1px dashed rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.01);
          transition: all 0.3s ease;
        }

        .upload-zone:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(255, 255, 255, 0.5);
        }

        .tooltip {
          background: rgba(255, 255, 255, 0.9);
          color: #000;
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 600;
          border-radius: 2px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        @keyframes loading {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}