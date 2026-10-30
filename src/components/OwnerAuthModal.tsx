import React, { useState } from 'react';
import { X, Lock, Key, ArrowRight, AlertCircle, Check } from 'lucide-react';
import { authenticateOwner } from '../utils/roleManager.ts';
import { PlanetLogo } from './PlanetLogo.tsx';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = authenticateOwner(passkey);
    if (ok) {
      setError(false);
      onSuccess();
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm border border-white bg-neutral-950 p-6 shadow-[0_0_50px_rgba(255,255,255,0.2)] font-mono text-xs">
        
        {/* Reticles */}
        <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-white" />
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-white" />
        <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-white" />
        <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-white" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-neutral-400 hover:text-white"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-800">
          <div className="p-1.5 border border-white bg-black text-white">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
              RESTRICTED PORTAL GATE
            </span>
            <h3 className="text-base font-bold text-white uppercase">
              Owner Verification
            </h3>
          </div>
        </div>

        <p className="pt-3 text-[11px] text-neutral-400 leading-relaxed">
          Enter the owner master passkey to unlock release file management, custom binaries, and visitor telemetry.
        </p>

        {error && (
          <div className="mt-3 p-2.5 border border-neutral-700 bg-neutral-900 text-white flex items-center gap-2 text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 text-neutral-300 shrink-0" />
            <span>Invalid passkey. Access denied.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="text-neutral-400 block mb-1">Master Passkey</label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-500" />
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter passkey (e.g. notnyxo)..."
                value={passkey}
                onChange={(e) => {
                  setPasskey(e.target.value);
                  setError(false);
                }}
                className="w-full pl-9 pr-3 py-2 border border-neutral-800 bg-black text-white text-xs placeholder-neutral-600 focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 border border-white bg-white py-2.5 font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
          >
            <span>Unlock Owner Controls</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
