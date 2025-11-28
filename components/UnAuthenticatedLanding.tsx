import React from 'react';
import { signIn } from 'next-auth/react';

export default function UnAuthenticatedLanding() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-400">
          Cartfax
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-slate-300 font-light">
          The Independent Dispensary & Batch Database
        </p>
        <p className="mt-4 text-sm text-slate-500 max-w-lg mx-auto">
          Modeled for transparency, not commerce. Access independent testing results, 
          live jurisdictional tracking, and verified community reviews.
        </p>
        
        <div className="mt-10">
          <button
            onClick={() => signIn()}
            className="group relative inline-flex items-center justify-center rounded-full bg-slate-800 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-700 hover:ring-2 hover:ring-emerald-500/50"
          >
            <span className="mr-2">Enter Atlas</span>
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 border-t border-slate-800/50 pt-8">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white mb-1">4+</span>
            <span className="text-xs uppercase tracking-widest text-slate-500">Jurisdictions</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white mb-1">Live</span>
            <span className="text-xs uppercase tracking-widest text-slate-500">Batch Tracking</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold text-white mb-1">100%</span>
            <span className="text-xs uppercase tracking-widest text-slate-500">Independent</span>
          </div>
        </div>
      </div>
    </div>
  );
}