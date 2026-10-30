import React, { useState } from 'react';
import { PlanetLogo } from './PlanetLogo.tsx';
import { Download, Menu, X, Settings2 } from 'lucide-react';
import { ReleaseConfig } from '../utils/releaseStorage.ts';

interface NavbarProps {
  config: ReleaseConfig;
  onOpenDownload: () => void;
  onOpenOwnerPanel: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onOpenDownload, onOpenOwnerPanel }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Brand wordmark & orbital symbol */}
        <a
          href="#"
          className="group flex items-center gap-3 text-white transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center border border-neutral-800 bg-neutral-950 transition-colors group-hover:border-neutral-500">
            <PlanetLogo className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-widest text-base sm:text-lg leading-tight uppercase font-mono">
              {config.siteName || 'VrcModMenu'}
            </span>
            <span className="text-[10px] tracking-widest text-neutral-400 font-mono">
              {config.clientName?.toUpperCase() || 'ORBIT'} CLIENT
            </span>
          </div>
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-400">
          <a
            href="#features"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white"
          >
            Features
          </a>
          <a
            href="#showcase"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white"
          >
            Showcase
          </a>
          <a
            href="#installation"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white"
          >
            Installation
          </a>
          <a
            href="#safety"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white"
          >
            Safety
          </a>
          <a
            href="#faq"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white"
          >
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1 primary action + Owner Manager trigger */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenOwnerPanel}
            title="Owner: Manage release files & custom download links"
            className="flex items-center gap-1.5 border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-mono text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white whitespace-nowrap shrink-0"
          >
            <Settings2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>Owner Panel</span>
          </button>

          <button
            onClick={onOpenDownload}
            className="group flex items-center gap-2 border border-white bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white hover:border-neutral-300 whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
            <span>Download {config.version}</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenOwnerPanel}
            className="p-2 text-neutral-400 hover:text-white border border-neutral-800"
            title="Owner Portal"
          >
            <Settings2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-900 bg-black px-6 py-4 space-y-3">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-300">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#showcase"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Showcase
            </a>
            <a
              href="#installation"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Installation
            </a>
            <a
              href="#safety"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Safety
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              FAQ
            </a>
          </nav>
          <div className="pt-3 border-t border-neutral-900 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOwnerPanel();
              }}
              className="w-full flex items-center justify-center gap-2 border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs font-mono text-neutral-300 hover:text-white"
            >
              <Settings2 className="w-4 h-4" />
              <span>Owner File Manager</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full flex items-center justify-center gap-2 border border-white bg-white px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-black hover:text-white"
            >
              <Download className="w-4 h-4" />
              <span>Download {config.version}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
