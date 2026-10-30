import React, { useState } from 'react';
import { X, User, ArrowRight, ShieldCheck, Check, LogIn } from 'lucide-react';
import { loginVisitor, VisitorUser } from '../utils/visitorAuth.ts';
import { PlanetLogo } from './PlanetLogo.tsx';

interface VisitorAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: VisitorUser) => void;
  reason?: string;
}

export const VisitorAuthModal: React.FC<VisitorAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  reason = 'Please identify your visitor handle to download the Orbit client.',
}) => {
  const [username, setUsername] = useState('');
  const [handle, setHandle] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;
    const user = loginVisitor(username, handle);
    onLoginSuccess(user);
    onClose();
  };

  const handleGuestLogin = () => {
    const guestName = 'VRC_Guest_' + Math.floor(100 + Math.random() * 900);
    const user = loginVisitor(guestName);
    onLoginSuccess(user);
    onClose();
  };

  const quickHandles = ['Astrid_VR', 'NovaRunner', 'NexusPlayer', 'VRC_Explorer'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md border border-white bg-neutral-950 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,255,255,0.18)]">
        
        {/* Reticles */}
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-white" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-white" />
        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-white" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-white" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 pb-5 border-b border-neutral-800">
          <div className="flex h-9 w-9 items-center justify-center border border-neutral-800 bg-black text-white">
            <PlanetLogo className="w-5 h-5" />
          </div>
          <div>
            <div className="font-mono text-xs text-neutral-400">
              VRC MOD MENU IDENTITY GATE
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight font-mono uppercase">
              Visitor Sign In
            </h3>
          </div>
        </div>

        {/* Reason notice */}
        <div className="pt-4 pb-2">
          <p className="text-xs font-mono text-neutral-300 leading-relaxed">
            {reason}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-3 space-y-4 font-mono text-xs">
          <div>
            <label className="text-neutral-400 block mb-1">
              VRChat Username or Display Name <span className="text-white">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                required
                placeholder="e.g. Astrid_VR, KitsuneModder"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-neutral-800 bg-black text-white placeholder-neutral-600 focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">
              Optional Discord Tag or Handle
            </label>
            <input
              type="text"
              placeholder="@username or user#0001"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-800 bg-black text-white placeholder-neutral-600 focus:border-white focus:outline-none"
            />
          </div>

          {/* Quick handle suggestions */}
          <div className="pt-1">
            <span className="text-neutral-500 text-[10px] block mb-1.5 uppercase">
              Quick Suggestions:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {quickHandles.map((h) => (
                <button
                  type="button"
                  key={h}
                  onClick={() => setUsername(h)}
                  className="px-2 py-0.5 border border-neutral-800 bg-black text-neutral-400 hover:text-white hover:border-neutral-600 text-[11px] transition-colors"
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-neutral-900 space-y-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 border border-white bg-white py-3 font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In & Continue</span>
            </button>

            <button
              type="button"
              onClick={handleGuestLogin}
              className="w-full py-2.5 border border-neutral-800 bg-black text-neutral-400 hover:text-white hover:border-neutral-600 text-xs transition-colors"
            >
              Continue as Anonymous Guest
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
