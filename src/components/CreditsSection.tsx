import React from 'react';
import { PlanetLogo } from './PlanetLogo.tsx';
import { Crown, Code, Sparkles, Terminal, Shield } from 'lucide-react';

export const CreditsSection: React.FC = () => {
  return (
    <section id="credits" className="relative border-b border-neutral-900 bg-black py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-900">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>OFFICIAL ATTRIBUTION</span>
              <span className="text-neutral-700">/</span>
              <span>CREATOR CREDITS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-mono uppercase">
              Credits & Authorship
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md font-mono">
            VrcModMenu and the Orbit client architecture are engineered and maintained by <strong className="text-white">notnyxo</strong>.
          </p>
        </div>

        {/* Lead Creator Card */}
        <div className="mt-12 border border-white bg-neutral-950 p-6 sm:p-10 shadow-[0_0_40px_rgba(255,255,255,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Creator Identity (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                <Crown className="w-4 h-4 text-white" />
                <span className="text-white font-bold uppercase tracking-wider">PROJECT FOUNDER & LEAD DEVELOPER</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center border border-white bg-black">
                  <PlanetLogo className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-white font-mono uppercase tracking-tight">
                    notnyxo
                  </h3>
                  <p className="text-xs font-mono text-neutral-400 mt-0.5">
                    Lead Engine Programmer & Security Architect
                  </p>
                </div>
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed font-sans pt-2 max-w-xl">
                Created and engineered from the ground up by <strong>notnyxo</strong>. Designed with a strict high-contrast monochrome aesthetic, zero telemetry bloat, and defensive client stabilization for VRChat instances.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-white" />
                  <span>Direct3D 11 Stencil & IL2CPP</span>
                </div>
                <span className="text-neutral-700">·</span>
                <div className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-white" />
                  <span>Defensive Anti-Crash Core</span>
                </div>
                <span className="text-neutral-700">·</span>
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-white" />
                  <span>Orbit Engine v2.4+</span>
                </div>
              </div>
            </div>

            {/* Right Column: Signature Terminal (5 cols) */}
            <div className="md:col-span-5 border border-neutral-800 bg-black p-5 font-mono text-xs space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-900 text-neutral-400">
                <span>AUTHOR SIGNATURE</span>
                <span className="text-white font-bold">VERIFIED</span>
              </div>
              <div className="text-[11px] text-neutral-300 space-y-1">
                <div>Developer: <strong className="text-white">notnyxo</strong></div>
                <div>Portal: <span className="text-white">VrcModMenu</span></div>
                <div>Client Core: <span className="text-white">Orbit (Monochrome Edition)</span></div>
                <div>Target Engine: <span className="text-neutral-400">Unity 2022.3 / MelonLoader</span></div>
                <div className="pt-2 text-[10px] text-neutral-500 border-t border-neutral-900">
                  PGP Signature: [SIGNED_BY_NOTNYXO_RELEASE_KEY]
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
