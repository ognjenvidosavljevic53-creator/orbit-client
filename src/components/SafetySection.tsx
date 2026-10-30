import React from 'react';
import { ShieldCheck, AlertCircle, FileText, Lock, Users } from 'lucide-react';

export const SafetySection: React.FC = () => {
  return (
    <section id="safety" className="relative border-b border-neutral-900 bg-black py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-900">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>SAFETY & ACCOUNT INTEGRITY</span>
              <span className="text-neutral-700">/</span>
              <span>TERMS & TRANSPARENCY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-mono uppercase">
              Security Philosophy
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Orbit is engineered with defensive principles. We build for personal performance, stability, and accessibility in virtual reality.
          </p>
        </div>

        {/* 3-Column Policy Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
          
          <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-neutral-800 bg-black text-white">
                <AlertCircle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                VRChat Terms of Service
              </h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Client modification is not officially sanctioned by VRChat Inc. and violates their End User License Agreement (EULA). While Orbit utilizes passive non-broadcasting hooks to minimize detection vectors, any client modification entails inherent account risk.
            </p>
            <div className="pt-2 border-t border-neutral-900 font-mono text-[11px] text-neutral-400">
              Recommendation: Use private or trusted instances.
            </div>
          </div>

          <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-neutral-800 bg-black text-white">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Zero Telemetry & Offline Core
              </h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Orbit contains no telemetry trackers, remote tokens, or external phone-home servers. The binary functions completely offline without phoning any third-party infrastructure. Your credentials, hardware identifiers, and session data remain strictly local.
            </p>
            <div className="pt-2 border-t border-neutral-900 font-mono text-[11px] text-neutral-400">
              Auditability: Verifiable via Wireshark / Fiddler.
            </div>
          </div>

          <div className="border border-neutral-800 bg-neutral-950 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-neutral-800 bg-black text-white">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Ethical Utility Standard
              </h3>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Orbit does not provide malicious griefing tools, instance crashers, or network flooders. We build features designed to shield players against malicious community assets (crash avatars, shader loop exploits, and audio screech attacks).
            </p>
            <div className="pt-2 border-t border-neutral-900 font-mono text-[11px] text-neutral-400">
              Mission: Defensive performance & quality of life.
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
