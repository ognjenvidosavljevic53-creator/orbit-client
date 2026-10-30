import React, { useState } from 'react';
import { X, Download, Check, Copy, FolderCheck } from 'lucide-react';
import { PlanetLogo } from './PlanetLogo.tsx';
import { triggerOrbitDownload } from '../utils/downloadHelper.ts';
import { ReleaseConfig } from '../utils/releaseStorage.ts';

interface DownloadModalProps {
  isOpen: boolean;
  config: ReleaseConfig;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, config, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyHash = () => {
    navigator.clipboard.writeText(config.sha256);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadAgain = async () => {
    await triggerOrbitDownload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl border border-white bg-neutral-950 p-6 sm:p-8 shadow-[0_0_50px_rgba(255,255,255,0.15)]">
        
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

        {/* Title */}
        <div className="flex items-center gap-3 pb-5 border-b border-neutral-800">
          <div className="flex h-9 w-9 items-center justify-center border border-neutral-800 bg-black">
            <PlanetLogo className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-mono text-xs text-neutral-400">
              {config.siteName?.toUpperCase() || 'VRCMODMENU'} // {config.clientName?.toUpperCase() || 'ORBIT'}
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight uppercase font-mono">
              Download Initialized
            </h3>
          </div>
        </div>

        {/* Body Content */}
        <div className="pt-6 space-y-5">
          <div className="border border-neutral-800 bg-black p-4 flex items-center gap-4">
            <div className="p-3 border border-neutral-800 bg-neutral-950 text-white shrink-0">
              <FolderCheck className="w-6 h-6" />
            </div>
            <div className="min-w-0 flex-1 font-mono text-xs">
              <div className="text-white font-bold text-sm truncate">
                {config.fileName}
              </div>
              <div className="text-neutral-400 text-[11px] pt-0.5">
                {config.fileSize} · {config.gameBuild} · Clean Signature
              </div>
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <span className="text-neutral-400">Next Steps:</span>
            <ol className="space-y-1.5 text-neutral-300 list-decimal list-inside text-xs leading-relaxed">
              <li>Open your downloaded <code className="text-white bg-black px-1 border border-neutral-800">{config.fileName}</code> package.</li>
              <li>Extract files into your <code className="text-neutral-400">VRChat/Mods/</code> directory.</li>
              <li>Launch VRChat and press <kbd className="border border-neutral-700 bg-black px-1 text-white">Insert</kbd> to open.</li>
            </ol>
          </div>

          {/* Hash Verification row */}
          <div className="border border-neutral-800 bg-black p-3 font-mono text-xs space-y-1.5">
            <div className="flex items-center justify-between text-neutral-400">
              <span>SHA-256 Signature:</span>
              <button
                onClick={handleCopyHash}
                className="flex items-center gap-1 text-white hover:text-neutral-300 transition-colors"
              >
                {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="text-[11px] text-neutral-400 truncate select-all">
              {config.sha256}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownloadAgain}
              className="flex-1 flex items-center justify-center gap-2 border border-white bg-white py-3 text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Again</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 border border-neutral-800 bg-black py-3 text-xs font-mono uppercase tracking-wider text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
