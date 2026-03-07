'use client';

import './landing.css';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { LandingAuthForm } from '../components/auth/landing-auth-form';
import { authClient, getAuthErrorMessage } from '../lib/auth-client';

type StepId =
  | 'step-0'
  | 'sign-in'
  | 'sign-up'
  | 'step-a1'
  | 'step-a1b'
  | 'step-a2'
  | 'step-b1'
  | 'step-b2'
  | 'step-b3'
  | 'dash-lead'
  | 'dash-member';

const POD_CODE = 'FY-8821';

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState<StepId>('step-0');
  const [copied, setCopied] = useState(false);
  const [memberSuccess, setMemberSuccess] = useState(false);
  const [showLeadPassword, setShowLeadPassword] = useState(false);
  const [showMemberPassword, setShowMemberPassword] = useState(false);

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
    <div
      className="landing-page min-h-0 h-full flex items-center justify-center pt-24 px-6 pb-6 overflow-auto"
      suppressHydrationWarning
    >
      <div className="grain" suppressHydrationWarning />

      {/* ONBOARDING WRAPPER */}
      <main className="w-full max-w-5xl flex flex-col min-h-full justify-center">
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
          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-center">
            <p className="text-accent/50 text-sm">
              Already have an account?{' '}
              <Link
                href="/sign-in"
                className="underline opacity-80 hover:opacity-100 transition-opacity"
              >
                Click here
              </Link>
            </p>
          </div>
        </div>

        {/* SIGN IN */}
        <div
          className={`step-container flex-col max-w-2xl mx-auto ${
            step === 'sign-in' ? 'active' : ''
          }`}
        >
          <div className="mb-10">
            <span className="mono text-[10px] opacity-40">AUTH</span>
            <h2 className="text-4xl font-black italic mt-2">SIGN IN</h2>
          </div>

          <LandingAuthForm
            mode="sign-in"
            submitLabel="Sign in"
            onSuccess={() => router.push('/visibility')}
            onSubmit={async ({ email, password }) => {
              const response = await authClient.signIn.email({ email, password });
              if (response?.error) {
                throw new Error(
                  getAuthErrorMessage(response, 'Unable to sign in with that account')
                );
              }
            }}
          />

          <p className="mt-6 text-center text-accent/50 text-sm">
            Need an account?{' '}
            <button
              type="button"
              onClick={() => goTo('step-0')}
              className="underline opacity-80 hover:opacity-100 transition-opacity"
            >
              Click here
            </button>
          </p>
          <button
            onClick={() => goTo('step-0')}
            className="mt-6 mono text-[10px] opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
          >
            ← Back
          </button>
        </div>

        {/* SIGN UP */}
        <div
          className={`step-container flex-col max-w-2xl mx-auto ${
            step === 'sign-up' ? 'active' : ''
          }`}
        >
          <div className="mb-10">
            <span className="mono text-[10px] opacity-40">AUTH</span>
            <h2 className="text-4xl font-black italic mt-2">SIGN UP</h2>
          </div>

          <LandingAuthForm
            mode="sign-up"
            submitLabel="Create account"
            onSuccess={() => router.push('/visibility')}
            onSubmit={async ({ name, email, password }) => {
              const response = await authClient.signUp.email({
                name: name?.trim() || email,
                email,
                password,
              });
              if (response?.error) {
                throw new Error(
                  getAuthErrorMessage(response, 'Unable to create that account')
                );
              }
            }}
          />

          <p className="mt-6 text-center text-accent/50 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => goTo('step-0')}
              className="underline opacity-80 hover:opacity-100 transition-opacity"
            >
              Click here
            </button>
          </p>
          <button
            onClick={() => goTo('step-0')}
            className="mt-6 mono text-[10px] opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
          >
            ← Back
          </button>
        </div>

        {/* FUNNEL A: TEAM LEAD */}
        {/* A1: Profile */}
        <div
          className={`step-container flex-col max-w-2xl mx-auto justify-center min-h-0 pt-8 ${
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
            <div className="flex flex-col">
              <label className="mono text-[10px] uppercase mb-2 opacity-50">
                Password
              </label>
              <div className="relative">
                <input
                  type={showLeadPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="debossed-input p-4 pr-12 rounded mono text-sm w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowLeadPassword((s: boolean) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
                  aria-label={showLeadPassword ? 'Hide password' : 'Show password'}
                >
                  {showLeadPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
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
                onClick={() => goTo('step-a1b')}
                className="btn-primary px-12"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        {/* A1b: Resume Upload */}
        <div
          className={`step-container flex-col max-w-2xl mx-auto justify-center min-h-0 pt-8 ${
            step === 'step-a1b' ? 'active' : ''
          }`}
        >
          <div className="mb-10">
            <span className="mono text-[10px] opacity-40">
              02 // RESUME_IMPORT
            </span>
            <h2 className="text-4xl font-black italic mt-2">
              EXECUTIVE RESUME
            </h2>
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
            </div>
            <div className="mono text-sm font-bold uppercase mb-2">
              Upload Executive Resume / PDF
            </div>
            <div className="text-[10px] opacity-40 max-w-xs">
              Drag files here to understand your management style and domain
              expertise for better routing rules.
            </div>
          </div>

          <div className="mt-8 p-4 bg-white/5 border-l-2 border-white/20">
            <p className="text-[11px] leading-relaxed italic opacity-70">
              "We use your resume to understand your management style and
              domain expertise to suggest better routing rules."
            </p>
          </div>

          <div className="pt-12 flex justify-between items-center">
            <button
              onClick={() => goTo('step-a1')}
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

        {/* A2: Workspace Key */}
        <div
          className={`step-container flex-col items-center text-center max-w-2xl mx-auto ${
            step === 'step-a2' ? 'active' : ''
          }`}
        >
          <div className="mb-10">
            <span className="mono text-[10px] opacity-40">
              03 // ACCESS_KEY_GEN
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
            <div className="mt-12 flex justify-between items-center w-full">
              <button
                onClick={() => goTo('step-a1b')}
                className="mono text-[10px] opacity-40 hover:opacity-100 transition-opacity uppercase tracking-widest"
              >
                Back
              </button>
              <button
                onClick={handleFinishLead}
                className="mono text-[10px] opacity-40 hover:opacity-100"
              >
                ENTER DASHBOARD →
              </button>
            </div>
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
              <label className="mono text-[10px] uppercase mb-2 opacity-50">
                Password
              </label>
              <div className="relative">
                <input
                  type={showMemberPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="debossed-input p-4 pr-12 rounded mono text-sm w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowMemberPassword((s: boolean) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
                  aria-label={showMemberPassword ? 'Hide password' : 'Show password'}
                >
                  {showMemberPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
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
              Proceed to Workspace
            </button>
          </div>
        </div>

        {/* B3: Join Workspace */}
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
                  Workspace Synchronization Active
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
            <div className="absolute top-0 left-0 h-full bg-white w-1/3 loading-bar" />
          </div>
        </div>
      </main>
    </div>
  );
}