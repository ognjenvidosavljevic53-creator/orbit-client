import React from 'react';
import { PlanetLogo } from './PlanetLogo.tsx';
import { Github, MessageSquare, ArrowUp, Shield, Settings2, Heart } from 'lucide-react';
import { ReleaseConfig } from '../utils/releaseStorage.ts';

interface FooterProps {
  config: ReleaseConfig;
  onOpenOwnerPanel: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenOwnerPanel }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-neutral-900 bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-neutral-900">
          
          {/* Brand & Mission (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center border border-neutral-800 bg-neutral-950">
                <PlanetLogo className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-widest text-lg uppercase font-mono">
                  {config.siteName || 'VrcModMenu'}
                </span>
                <span className="text-[10px] tracking-wider text-neutral-400 font-mono">
                  {config.clientName?.toUpperCase() || 'ORBIT'} CLIENT PORTAL
                </span>
              </div>
            </div>
            
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed font-mono">
              VrcModMenu official distribution hub for Orbit Client. Developed and engineered by <strong className="text-white">notnyxo</strong>.
            </p>

            <div className="flex items-center gap-2 pt-1 font-mono text-xs text-neutral-300">
              <span className="text-neutral-500">Credits:</span>
              <span className="px-2 py-0.5 border border-white bg-white text-black font-bold uppercase">
                notnyxo
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://discord.gg/orbit-vr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs font-mono text-neutral-300 hover:border-white hover:text-white transition-colors"
                aria-label="Orbit Community Discord"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Discord (14.8k)</span>
              </a>

              <a
                href="https://github.com/orbit-client/orbit-vr"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-neutral-800 bg-neutral-950 px-3.5 py-2 text-xs font-mono text-neutral-300 hover:border-white hover:text-white transition-colors"
                aria-label="Orbit GitHub Repository"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <button
                onClick={onOpenOwnerPanel}
                className="flex items-center gap-1.5 border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>Owner Portal</span>
              </button>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <span className="text-white font-semibold uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Core Modules
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-white transition-colors">
                  Interactive Showcase
                </a>
              </li>
              <li>
                <a href="#installation" className="hover:text-white transition-colors">
                  Installation Guide
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-white transition-colors">
                  Security & Integrity
                </a>
              </li>
              <li>
                <a href="#credits" className="hover:text-white transition-colors font-bold text-neutral-300">
                  Credits (notnyxo)
                </a>
              </li>
            </ul>
          </div>

          {/* Core Specs (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <span className="text-white font-semibold uppercase tracking-wider block">
              Release Telemetry
            </span>
            <div className="space-y-2 border border-neutral-800 bg-neutral-950 p-4">
              <div className="flex justify-between text-neutral-400">
                <span>Developer:</span>
                <span className="text-white font-bold">notnyxo</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Client:</span>
                <span className="text-white font-semibold">{config.clientName || 'Orbit'} ({config.version})</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Target:</span>
                <span className="text-white">{config.gameBuild}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Active Package:</span>
                <span className="text-white font-mono text-[11px] truncate ml-2 max-w-[170px]" title={config.fileName}>
                  {config.fileName}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Straightforward Safety Disclaimer Banner */}
        <div className="my-10 border border-neutral-900 bg-neutral-950/70 p-5 font-mono text-xs text-neutral-400 leading-relaxed">
          <div className="flex items-center gap-2 text-white font-semibold mb-2">
            <Shield className="w-4 h-4" />
            <span className="uppercase tracking-wider">Safety & Regulatory Disclaimer</span>
          </div>
          <p>
            VrcModMenu distributes Orbit as an open-architecture personal utility tool designed by notnyxo solely for accessibility, performance optimization, and defensive client stabilization. VrcModMenu and Orbit are not affiliated with, endorsed by, or partnered with VRChat Inc. Modifying client memory or utilizing third-party mods violates the VRChat Terms of Service (EULA). Use responsibly and at your own personal discretion.
          </p>
        </div>

        {/* Bottom copyright row with notnyxo credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400 pt-4">
          <div>
            © {new Date().getFullYear()} {config.siteName?.toUpperCase() || 'VRCMODMENU'} · Engineered by <strong className="text-white">notnyxo</strong>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
