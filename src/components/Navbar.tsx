import React, { useState } from 'react';
import { PlanetLogo } from './PlanetLogo.tsx';
import { Download, Menu, X, Settings2, UserCheck, LogIn, LogOut, Crown } from 'lucide-react';
import { ReleaseConfig } from '../utils/releaseStorage.ts';
import { VisitorUser, logoutVisitor } from '../utils/visitorAuth.ts';
import { UserRole } from '../utils/roleManager.ts';

interface NavbarProps {
  config: ReleaseConfig;
  currentRole: UserRole;
  currentVisitor: VisitorUser | null;
  onOpenDownload: () => void;
  onOpenOwnerPanel: () => void;
  onOpenLogin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  config, 
  currentRole,
  currentVisitor,
  onOpenDownload, 
  onOpenOwnerPanel,
  onOpenLogin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isOwner = currentRole === 'owner';
  const isCoOwner = currentRole === 'co-owner';
  const isPrivileged = isOwner || isCoOwner;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-6 lg:px-8">
        {/* Zone 1: Brand wordmark & orbital symbol with notnyxo credits */}
        <a
          href="#"
          className="group flex items-center gap-3 text-white transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center border border-neutral-800 bg-neutral-950 transition-colors group-hover:border-neutral-500">
            <PlanetLogo className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-widest text-base sm:text-lg leading-tight uppercase font-mono">
                {config.siteName || 'VrcModMenu'}
              </span>
              <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.2 border border-neutral-800 text-neutral-400 font-mono">
                dev: notnyxo
              </span>
            </div>
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
            href="#credits"
            className="whitespace-nowrap shrink-0 transition-colors hover:text-white"
          >
            Credits
          </a>
        </nav>

        {/* Zone 3: 1 primary action + Owner/Visitor identity */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          
          {/* If Owner: Automatic permanent bypass with Owner badge (NO sign-in needed!) */}
          {isOwner ? (
            <div className="flex items-center gap-1.5 border border-white bg-white text-black px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5" />
              <span>Owner Access</span>
            </div>
          ) : isCoOwner ? (
            <div className="flex items-center gap-1.5 border border-neutral-600 bg-neutral-900 text-white px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-wider">
              <span>Co-Owner</span>
            </div>
          ) : currentVisitor ? (
            <div className="flex items-center gap-2 border border-neutral-800 bg-neutral-950 px-2.5 py-1.5 font-mono text-xs text-neutral-300">
              <UserCheck className="w-3.5 h-3.5 text-white" />
              <span className="font-bold text-white truncate max-w-[110px]" title={currentVisitor.username}>
                {currentVisitor.username}
              </span>
              <button
                onClick={logoutVisitor}
                title="Log out"
                className="text-neutral-500 hover:text-white ml-1"
              >
                <LogOut className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 border border-neutral-800 bg-black px-3 py-2 text-xs font-mono text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors whitespace-nowrap"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Visitor Sign In</span>
            </button>
          )}

          {/* Owner Only Portal Button */}
          {isOwner && (
            <button
              onClick={onOpenOwnerPanel}
              title="Owner Operations Portal"
              className="flex items-center gap-1.5 border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs font-mono text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white whitespace-nowrap shrink-0"
            >
              <Settings2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Portal</span>
            </button>
          )}

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
          {isOwner ? (
            <span className="text-[10px] font-mono border border-white bg-white text-black px-2 py-0.5 font-bold uppercase">
              Owner
            </span>
          ) : isCoOwner ? (
            <span className="text-[10px] font-mono border border-neutral-600 bg-neutral-900 text-white px-2 py-0.5 font-bold uppercase">
              Co-Owner
            </span>
          ) : currentVisitor ? (
            <span className="text-[11px] font-mono border border-neutral-800 px-2 py-1 text-white truncate max-w-[90px]">
              {currentVisitor.username}
            </span>
          ) : null}

          {isOwner && (
            <button
              onClick={onOpenOwnerPanel}
              className="p-2 text-neutral-400 hover:text-white border border-neutral-800"
              title="Portal Manager"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          )}

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
          <nav className="flex flex-col space-y-3 text-sm font-medium text-neutral-300 font-mono">
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
              href="#credits"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Credits (notnyxo)
            </a>
          </nav>
          <div className="pt-3 border-t border-neutral-900 flex flex-col gap-2 font-mono">
            <div className="text-[11px] text-neutral-500 py-1">
              Developed & Maintained by <span className="text-white font-bold">notnyxo</span>
            </div>

            {!isOwner && !currentVisitor && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLogin();
                }}
                className="w-full flex items-center justify-center gap-2 border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs font-mono text-neutral-300 hover:text-white"
              >
                <LogIn className="w-4 h-4" />
                <span>Visitor Sign In</span>
              </button>
            )}

            {isOwner && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOwnerPanel();
                }}
                className="w-full flex items-center justify-center gap-2 border border-neutral-800 bg-neutral-950 px-4 py-2 text-xs font-mono text-neutral-300 hover:text-white"
              >
                <Settings2 className="w-4 h-4" />
                <span>Owner & AI Portal</span>
              </button>
            )}

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
