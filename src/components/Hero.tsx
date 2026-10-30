import React from 'react';
import { Download, ChevronRight, ShieldCheck, Cpu, Eye, Settings2 } from 'lucide-react';
import { PlanetLogo } from './PlanetLogo.tsx';
import { ReleaseConfig } from '../utils/releaseStorage.ts';

import { UserRole } from '../utils/roleManager.ts';

interface HeroProps {
  config: ReleaseConfig;
  currentRole: UserRole;
  onOpenDownload: () => void;
  onExplorePreview: () => void;
  onOpenOwnerPanel: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  config, 
  currentRole,
  onOpenDownload, 
  onExplorePreview,
  onOpenOwnerPanel
}) => {
  return (
    <section className="relative overflow-hidden border-b border-neutral-900 bg-black pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Subtle geometric grid background */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
        aria-hidden="true"
      />

      {/* Subtle radial monochrome vignette */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.06)_0%,_transparent_70%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* Left Column: Typography & CTAs (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Clean unboxed status badge with typographic separator */}
            <div className="flex flex-wrap items-center gap-2.5 border border-neutral-800 bg-neutral-950 px-3 py-1.5 font-mono text-xs text-neutral-300">
              <span className="inline-block w-2 h-2 bg-white rounded-none" />
              <span className="font-semibold text-white">{config.siteName || 'VrcModMenu'}</span>
              <span className="text-neutral-600">/</span>
              <span className="text-white">{config.clientName || 'Orbit'} {config.version}</span>
              <span className="text-neutral-600">/</span>
              <span>by <strong className="text-white">notnyxo</strong></span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-400">Undetected Core</span>
            </div>

            {/* Bold sans-serif title with brand mark */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <PlanetLogo className="w-10 h-10 md:w-12 md:h-12 text-white" />
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase font-mono">
                  {config.siteName || 'VrcModMenu'}
                </h1>
              </div>
              <p className="text-xl sm:text-2xl font-medium tracking-tight text-neutral-300 max-w-2xl font-mono">
                {config.clientName?.toUpperCase() || 'ORBIT'} CLIENT — by <span className="text-white font-bold underline decoration-1 underline-offset-4">notnyxo</span>
              </p>
            </div>

            {/* Concise tagline */}
            <p className="text-base sm:text-lg text-neutral-400 max-w-xl leading-relaxed">
              Engineered with zero visual bloat and extreme frametime stability. Access avatar wireframe inspection, spatial ESP telemetry, non-intrusive safety guards, and micro-stutter suppression.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <button
                onClick={onOpenDownload}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 border border-white bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white hover:border-neutral-300 shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              >
                <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                <span>Download {config.clientName || 'Orbit'} ({config.version})</span>
              </button>

              <button
                onClick={onExplorePreview}
                className="w-full sm:w-auto flex items-center justify-center gap-2 border border-neutral-800 bg-neutral-950 px-6 py-3.5 text-sm font-semibold uppercase tracking-wider text-neutral-200 transition-all hover:border-white hover:text-white"
              >
                <span>Interactive Menu Simulator</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {currentRole === 'owner' && (
                <button
                  onClick={onOpenOwnerPanel}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 border border-neutral-800 bg-black px-4 py-3.5 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                  title="Owner: change download files"
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  <span>Set Custom Files (Owner)</span>
                </button>
              )}
            </div>

            {/* Micro specs strip */}
            <div className="pt-4 border-t border-neutral-900 w-full flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-white" />
                <span>MelonLoader 0.6+</span>
              </div>
              <span className="text-neutral-700">·</span>
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-white" />
                <span>VR & Desktop Supported</span>
              </div>
              <span className="text-neutral-700">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>Package: {config.fileSize}</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Monochromatic Visual Framing (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative border border-neutral-800 bg-neutral-950 p-2 shadow-[0_0_40px_rgba(255,255,255,0.06)] group transition-all duration-500 hover:border-neutral-500">
              
              {/* Corner tech reticles */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-white" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-white" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-white" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-white" />

              {/* Main Image Container */}
              <div className="relative overflow-hidden aspect-[16/10] bg-black">
                <img
                  src="/src/assets/images/orbit_hud_interface_1793385763826.jpg"
                  alt="VrcModMenu Orbit Client HUD and Telemetry Overlay Preview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Stark high-contrast HUD overlay header */}
                <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/90 via-black/40 to-transparent p-3 flex items-center justify-between font-mono text-[11px] text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white" />
                    <span>{config.clientName?.toUpperCase() || 'ORBIT'} // HUD ACTIVE</span>
                  </div>
                  <span className="text-neutral-400">90 FPS · 11.1ms</span>
                </div>

                {/* Inset emblem badge */}
                <div className="absolute bottom-3 right-3 border border-neutral-700 bg-black/90 p-2 flex items-center gap-2">
                  <PlanetLogo className="w-4 h-4 text-white" />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-white">
                    {config.siteName?.toUpperCase() || 'VRCMODMENU'}
                  </span>
                </div>
              </div>

              {/* Framing metadata strip */}
              <div className="mt-2 flex items-center justify-between px-2 py-1.5 border-t border-neutral-900 font-mono text-[11px] text-neutral-400">
                <span>Overlay Mode: Minimal HUD</span>
                <span className="text-neutral-600">|</span>
                <span>Shader Guard: ACTIVE</span>
                <span className="text-neutral-600">|</span>
                <span className="text-white">HOTKEY: [INS]</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
