import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Key, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Settings2, 
  LogOut, 
  ShieldCheck, 
  Terminal,
  Crown
} from 'lucide-react';
import { PlanetLogo } from './PlanetLogo.tsx';
import { authenticateOwner, getRoleState, logoutRole, UserRole } from '../utils/roleManager.ts';
import { ReleaseConfig } from '../utils/releaseStorage.ts';

interface SecretOwnerPageProps {
  config: ReleaseConfig;
  currentRole: UserRole;
  onOpenOwnerPanel: () => void;
  onNavigateHome: () => void;
}

export const SecretOwnerPage: React.FC<SecretOwnerPageProps> = ({
  config,
  currentRole,
  onOpenOwnerPanel,
  onNavigateHome,
}) => {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    document.title = 'Orbit // Secure Owner Gateway';
    return () => {
      document.title = `${config.siteName || 'VrcModMenu'} // ${config.clientName || 'Orbit'}`;
    };
  }, [config]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Please enter the owner passcode.');
      return;
    }

    const success = authenticateOwner(passcode);
    if (success) {
      setErrorMsg('');
      setIsSuccess(true);
      setTimeout(() => {
        onOpenOwnerPanel();
      }, 500);
    } else {
      setErrorMsg('Access denied. Incorrect passcode.');
    }
  };

  const handleLogout = () => {
    logoutRole();
    setIsSuccess(false);
    setPasscode('');
  };

  const isAlreadyOwner = currentRole === 'owner';

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black flex flex-col font-mono">
      {/* Top stealth bar */}
      <header className="border-b border-neutral-900 bg-black/90 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center border border-neutral-800 bg-neutral-950">
            <PlanetLogo className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 tracking-widest uppercase block">
              RESTRICTED ROUTE // NODE 01
            </span>
            <span className="text-xs font-bold text-white tracking-wider">
              {config.clientName?.toUpperCase() || 'ORBIT'} SECURE CONTROL
            </span>
          </div>
        </div>

        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2 border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Main Site</span>
        </button>
      </header>

      {/* Main Terminal Frame */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-lg border border-neutral-800 bg-neutral-950 p-6 sm:p-8 shadow-[0_0_60px_rgba(255,255,255,0.08)]">
          {/* Tech Corner Reticles */}
          <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
          <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
          <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

          {/* Terminal Header */}
          <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-white bg-black text-white">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-neutral-400 tracking-widest uppercase">
                  CONFIDENTIAL AUTH GATE
                </div>
                <h1 className="text-lg font-bold text-white uppercase tracking-tight">
                  Owner Authentication
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-1 bg-black border border-neutral-800 text-[10px] text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>STANDBY</span>
            </div>
          </div>

          {/* Status View: Already Authenticated as Owner */}
          {isAlreadyOwner ? (
            <div className="py-6 space-y-6">
              <div className="p-4 border border-white/20 bg-neutral-900/60 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Crown className="w-4 h-4 text-white" />
                  <span>OWNER PRIVILEGES ACTIVE</span>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  You are authenticated with full root permissions. You have access to custom file management, download overrides, visitor telemetry, and AI assistance.
                </p>
                <div className="pt-2 text-[11px] text-neutral-400 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>Authorized Identity: <strong className="text-white">notnyxo</strong></span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={onOpenOwnerPanel}
                  className="w-full flex items-center justify-center gap-2 border border-white bg-white py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
                >
                  <Settings2 className="w-4 h-4" />
                  <span>Open Owner Operations & Customizer</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={onNavigateHome}
                    className="flex items-center justify-center gap-2 border border-neutral-700 bg-neutral-900 py-2.5 text-xs text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Go to Public Site</span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 border border-neutral-800 bg-black py-2.5 text-xs text-neutral-400 hover:text-rose-400 hover:border-rose-900 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Lock Session</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Passcode Entry Form */
            <div className="py-5 space-y-5">
              <div className="space-y-1">
                <p className="text-xs text-neutral-400 leading-relaxed">
                  This route is strictly for the project owner (<strong className="text-white">notnyxo</strong>). Normal visitors cannot view admin settings or upload custom files.
                </p>
                <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 pt-1">
                  <Terminal className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Passcode verification stores session persistently in browser storage.</span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 border border-rose-900 bg-rose-950/30 text-rose-300 flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {isSuccess && (
                <div className="p-3 border border-emerald-900 bg-emerald-950/30 text-emerald-300 flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Passcode accepted. Loading owner terminal...</span>
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Owner Passcode
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                    <input
                      type={showPasscode ? 'text' : 'password'}
                      required
                      autoFocus
                      placeholder="Enter owner passcode..."
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value);
                        setErrorMsg('');
                      }}
                      className="w-full pl-10 pr-10 py-2.5 border border-neutral-800 bg-black text-sm text-white placeholder-neutral-600 focus:border-white focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3 top-3 text-neutral-500 hover:text-white"
                      aria-label="Toggle password visibility"
                    >
                      {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="block text-[10px] text-neutral-400 mt-1">
                    Accepts master owner passcode (e.g. notnyxo)
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 border border-white bg-white py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                >
                  <span>Authenticate & Unlock Owner Panel</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="pt-4 border-t border-neutral-900 text-center">
                <button
                  onClick={onNavigateHome}
                  className="text-xs text-neutral-400 hover:text-white transition-colors"
                >
                  ← Return to public site
                </button>
              </div>
            </div>
          )}

          {/* Micro Footer Notice */}
          <div className="pt-4 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-400">
            <span>ORBIT CLIENT ENGINE</span>
            <span>DEVELOPER: NOTNYXO</span>
          </div>
        </div>
      </main>
    </div>
  );
};
