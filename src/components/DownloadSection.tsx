import React, { useState } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  FolderDown, 
  FileCode, 
  Play, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  History,
  Settings2,
  HardDrive
} from 'lucide-react';
import { triggerOrbitDownload } from '../utils/downloadHelper.ts';
import { ReleaseConfig } from '../utils/releaseStorage.ts';

interface DownloadSectionProps {
  config: ReleaseConfig;
  onDownloadTriggered: () => void;
  onOpenOwnerPanel: () => void;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ 
  config, 
  onDownloadTriggered,
  onOpenOwnerPanel
}) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [userHashInput, setUserHashInput] = useState('');
  const [hashVerificationStatus, setHashVerificationStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');

  const copyHashToClipboard = () => {
    navigator.clipboard.writeText(config.sha256);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleVerifyHash = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userHashInput.trim()) {
      setHashVerificationStatus('idle');
      return;
    }
    if (userHashInput.trim().toLowerCase() === config.sha256.toLowerCase()) {
      setHashVerificationStatus('valid');
    } else {
      setHashVerificationStatus('invalid');
    }
  };

  const handleDownload = async () => {
    await triggerOrbitDownload();
    onDownloadTriggered();
  };

  return (
    <section id="installation" className="relative border-b border-neutral-900 bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-900">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>{config.siteName?.toUpperCase() || 'VRCMODMENU'} DEPLOYMENT</span>
              <span className="text-neutral-700">/</span>
              <span>{config.clientName?.toUpperCase() || 'ORBIT'} CLIENT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-mono uppercase">
              Download & Install
            </h2>
          </div>
          
          {/* Live Status Indicator Box */}
          <div className="flex items-center gap-3 border border-neutral-800 bg-neutral-950 px-4 py-3 font-mono text-xs">
            <div className="w-2.5 h-2.5 bg-white shrink-0" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{config.statusText}</span>
              </div>
              <span className="text-[10px] text-neutral-400">Target: {config.gameBuild} · Clean Hash</span>
            </div>
          </div>
        </div>

        {/* Primary Download Banner Box */}
        <div className="mt-12 border border-neutral-800 bg-neutral-950 p-6 sm:p-8 lg:p-10 shadow-[0_0_35px_rgba(255,255,255,0.05)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5 font-mono text-xs text-neutral-400">
                <span className="text-white font-bold">{config.clientName?.toUpperCase() || 'ORBIT'} {config.version}</span>
                <span className="text-neutral-700">·</span>
                <span>PRODUCTION STABLE</span>
                <span className="text-neutral-700">·</span>
                <span>{config.fileSize}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-mono">
                Get {config.clientName || 'Orbit'} for VRChat
              </h3>

              <p className="text-sm text-neutral-300 leading-relaxed max-w-xl">
                Download the official release package (<code className="font-mono text-white bg-black px-1.5 py-0.5 border border-neutral-800">{config.fileName}</code>). Contains the compiled mod binary, configuration template, and SHA-256 integrity signature.
              </p>

              {/* Checksum Row */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-2 font-mono text-xs">
                <span className="text-neutral-400 shrink-0">SHA-256 Checksum:</span>
                <div className="flex items-center gap-2 overflow-hidden border border-neutral-800 bg-black px-2.5 py-1.5 max-w-full">
                  <span className="truncate text-neutral-300 text-[11px] select-all">
                    {config.sha256}
                  </span>
                  <button
                    onClick={copyHashToClipboard}
                    className="shrink-0 p-1 text-neutral-400 hover:text-white transition-colors"
                    title="Copy SHA-256 to clipboard"
                    aria-label="Copy SHA-256 checksum"
                  >
                    {copiedHash ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Download Action (5 cols) */}
            <div className="lg:col-span-5 flex flex-col sm:items-end justify-center space-y-3">
              <button
                onClick={handleDownload}
                className="group w-full sm:w-auto flex items-center justify-center gap-3 border border-white bg-white px-8 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all hover:bg-black hover:text-white hover:border-neutral-300 shadow-[0_0_25px_rgba(255,255,255,0.18)]"
              >
                <Download className="w-5 h-5 transition-transform group-hover:translate-y-0.5" />
                <span>Download {config.clientName || 'Orbit'} ({config.version})</span>
              </button>

              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 pt-1">
                <button
                  onClick={() => setShowChangelog(!showChangelog)}
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>{showChangelog ? 'Hide Changelog' : 'View Changelog'}</span>
                  {showChangelog ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
                <span className="text-neutral-700">·</span>
                <button
                  onClick={onOpenOwnerPanel}
                  className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
                  title="Owner: change the release file or URL"
                >
                  <Settings2 className="w-3 h-3" />
                  <span>Owner: Manage File</span>
                </button>
              </div>
            </div>

          </div>

          {/* Expandable Changelog */}
          {showChangelog && (
            <div className="mt-8 pt-6 border-t border-neutral-800 space-y-6 font-mono text-xs animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-white font-bold text-sm">Release Version History</span>
                <span className="text-neutral-400">Targeting Unity 2022.3 IL2CPP</span>
              </div>

              <div className="space-y-4">
                <div className="border border-neutral-800 bg-black p-4 space-y-2">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="text-white font-bold">{config.version} — Latest Patch</span>
                    <span className="text-neutral-400">March 2026</span>
                  </div>
                  <ul className="space-y-1 text-neutral-400 list-disc list-inside">
                    <li>Updated memory signatures for VRChat {config.gameBuild}.</li>
                    <li>Added aggressive geometry shader packet sanitizer in Anti-Crash Shield.</li>
                    <li>Optimized bone transform limiter to reduce latency below 0.18ms.</li>
                  </ul>
                </div>

                <div className="border border-neutral-800 bg-black p-4 space-y-2">
                  <div className="flex items-center justify-between text-neutral-300">
                    <span className="text-white font-bold">v2.4.0 — Monochrome Engine Overhaul</span>
                    <span className="text-neutral-400">February 2026</span>
                  </div>
                  <ul className="space-y-1 text-neutral-400 list-disc list-inside">
                    <li>Full monochrome high-contrast HUD rendering pass with Direct3D11 stencil.</li>
                    <li>Added quick-rejoin instance memory cache.</li>
                    <li>Integrated real-time audio burst limiter to prevent malicious screech avatars.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Step-by-Step Installation Cards */}
        <div className="mt-12">
          <div className="pb-6">
            <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              Installation Sequence
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between hover:border-neutral-500 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-900 font-mono text-xs">
                  <span className="text-white font-bold">STEP 01</span>
                  <FileCode className="w-4 h-4 text-neutral-400" />
                </div>
                <h4 className="pt-4 text-base font-bold text-white tracking-tight">
                  Install MelonLoader
                </h4>
                <p className="pt-2 text-xs text-neutral-400 leading-relaxed">
                  Install MelonLoader (version 0.6.1 or newer) pointing to your VRChat game executable (<code className="text-neutral-300">VRChat.exe</code>).
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-900 font-mono text-[11px] text-neutral-400">
                Prerequisite: .NET 6+ Runtime
              </div>
            </div>

            {/* Step 2 */}
            <div className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between hover:border-neutral-500 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-900 font-mono text-xs">
                  <span className="text-white font-bold">STEP 02</span>
                  <FolderDown className="w-4 h-4 text-neutral-400" />
                </div>
                <h4 className="pt-4 text-base font-bold text-white tracking-tight">
                  Download {config.clientName || 'Orbit'}
                </h4>
                <p className="pt-2 text-xs text-neutral-400 leading-relaxed">
                  Obtain <code className="text-white">{config.fileName}</code> from the download button above. Ensure the archive hash matches.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-900 font-mono text-[11px] text-neutral-400">
                Size: {config.fileSize}
              </div>
            </div>

            {/* Step 3 */}
            <div className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between hover:border-neutral-500 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-900 font-mono text-xs">
                  <span className="text-white font-bold">STEP 03</span>
                  <FolderDown className="w-4 h-4 text-neutral-400" />
                </div>
                <h4 className="pt-4 text-base font-bold text-white tracking-tight">
                  Place in /Mods/
                </h4>
                <p className="pt-2 text-xs text-neutral-400 leading-relaxed">
                  Extract files into your VRChat <code className="text-neutral-300">/Mods/</code> folder.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-900 font-mono text-[11px] text-neutral-400">
                Path: VRChat/Mods/Orbit.dll
              </div>
            </div>

            {/* Step 4 */}
            <div className="border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between hover:border-neutral-500 transition-colors">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-900 font-mono text-xs">
                  <span className="text-white font-bold">STEP 04</span>
                  <Play className="w-4 h-4 text-neutral-400" />
                </div>
                <h4 className="pt-4 text-base font-bold text-white tracking-tight">
                  Launch & Toggle
                </h4>
                <p className="pt-2 text-xs text-neutral-400 leading-relaxed">
                  Start VRChat. Press <kbd className="border border-neutral-700 bg-black px-1.5 py-0.5 text-white font-mono">Insert</kbd> on PC or <kbd className="border border-neutral-700 bg-black px-1.5 py-0.5 text-white font-mono">R-Stick</kbd> in VR to toggle.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-neutral-900 font-mono text-[11px] text-neutral-400">
                Menu Toggle: Instant Overlay
              </div>
            </div>

          </div>
        </div>

        {/* Checksum Hash Verification Tool */}
        <div className="mt-12 border border-neutral-900 bg-black p-6 font-mono text-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-900">
            <div className="space-y-1">
              <span className="font-bold text-white uppercase tracking-wider">File Hash Verifier</span>
              <p className="text-neutral-400 text-[11px]">
                Verify your downloaded file against the active release checksum signature.
              </p>
            </div>
            {hashVerificationStatus === 'valid' && (
              <span className="flex items-center gap-1.5 text-white border border-white bg-neutral-950 px-3 py-1">
                <Check className="w-3.5 h-3.5" />
                <span>HASH MATCHES — OFFICIAL VERIFIED</span>
              </span>
            )}
            {hashVerificationStatus === 'invalid' && (
              <span className="flex items-center gap-1.5 text-white border border-neutral-600 bg-neutral-950 px-3 py-1">
                <span>HASH MISMATCH — DO NOT RUN FILE</span>
              </span>
            )}
          </div>

          <form onSubmit={handleVerifyHash} className="mt-4 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Paste SHA-256 hash here to test integrity..."
              value={userHashInput}
              onChange={(e) => {
                setUserHashInput(e.target.value);
                setHashVerificationStatus('idle');
              }}
              className="flex-1 border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-white placeholder-neutral-600 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="border border-white bg-white px-5 py-2 text-xs font-bold text-black uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
            >
              Verify Hash
            </button>
            <button
              type="button"
              onClick={() => {
                setUserHashInput(config.sha256);
                setHashVerificationStatus('valid');
              }}
              className="border border-neutral-800 bg-black px-4 py-2 text-xs text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors whitespace-nowrap"
            >
              Use Current Hash
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
