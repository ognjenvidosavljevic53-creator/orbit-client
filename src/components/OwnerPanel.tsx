import React, { useState, useEffect } from 'react';
import { 
  X, 
  UploadCloud, 
  Link2, 
  Save, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  HardDrive,
  Users,
  BarChart3,
  Sliders,
  Lock,
  Copy,
  Download,
  Trash2,
  FileSpreadsheet,
  Search,
  User,
  Bot,
  Sparkles
} from 'lucide-react';
import { 
  ReleaseConfig, 
  getStoredConfig, 
  saveStoredConfig, 
  storeReleaseFile, 
  clearStoredReleaseFile,
  getStoredReleaseFile,
  DEFAULT_RELEASE 
} from '../utils/releaseStorage.ts';
import { 
  AnalyticsEvent, 
  getAnalyticsEvents, 
  clearAnalyticsLogs 
} from '../utils/analyticsTracker.ts';
import { 
  UserRole, 
  RoleState, 
  getRoleState, 
  saveRoleState, 
  logoutRole,
  generateCoOwnerInviteLink,
  generateOwnerSecretLink 
} from '../utils/roleManager.ts';
import { PlanetLogo } from './PlanetLogo.tsx';
import { OrbitAiSentinel } from './OrbitAiSentinel.tsx';

interface OwnerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigUpdated: () => void;
}

export const OwnerPanel: React.FC<OwnerPanelProps> = ({ isOpen, onClose, onConfigUpdated }) => {
  const [activeTab, setActiveTab] = useState<'files' | 'customize' | 'analytics' | 'ai' | 'roles'>('analytics');
  
  // Release & Site Config State
  const [config, setConfig] = useState<ReleaseConfig>(DEFAULT_RELEASE);
  const [hasStoredFile, setHasStoredFile] = useState(false);
  const [storedFileName, setStoredFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Role State
  const [roleState, setRoleState] = useState<RoleState>(getRoleState());
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [copiedOwnerLink, setCopiedOwnerLink] = useState(false);

  // Analytics & Visitor Search State
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [analyticsFilter, setAnalyticsFilter] = useState<'ALL' | 'DOWNLOAD' | 'PAGE_VIEW'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      const current = getStoredConfig();
      setConfig(current);
      checkStoredFile();
      setRoleState(getRoleState());
      setEvents(getAnalyticsEvents());
    }

    const handleAnalyticsUpdate = () => {
      setEvents(getAnalyticsEvents());
    };
    window.addEventListener('vrcmodmenu:analytics-updated', handleAnalyticsUpdate);
    return () => {
      window.removeEventListener('vrcmodmenu:analytics-updated', handleAnalyticsUpdate);
    };
  }, [isOpen]);

  const checkStoredFile = async () => {
    const file = await getStoredReleaseFile();
    if (file) {
      setHasStoredFile(true);
      setStoredFileName(file.name);
    } else {
      setHasStoredFile(false);
      setStoredFileName('');
    }
  };

  const isOwner = roleState.currentRole === 'owner';

  const handleFileUpload = async (file: File) => {
    if (!isOwner) return;
    try {
      setIsProcessing(true);
      const { fileName, fileSize, sha256 } = await storeReleaseFile(file);
      const updated: ReleaseConfig = {
        ...config,
        fileName,
        fileSize,
        sha256,
        customDownloadUrl: '',
      };
      setConfig(updated);
      saveStoredConfig(updated);
      setHasStoredFile(true);
      setStoredFileName(fileName);
      setSaveSuccess(true);
      onConfigUpdated();
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error uploading release file:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (!isOwner) return;
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredConfig(config);
    saveRoleState(roleState);
    setSaveSuccess(true);
    onConfigUpdated();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleResetToDefault = async () => {
    if (!isOwner) return;
    if (confirm('Reset to default VrcModMenu — Orbit release package?')) {
      await clearStoredReleaseFile();
      setConfig(DEFAULT_RELEASE);
      saveStoredConfig(DEFAULT_RELEASE);
      setHasStoredFile(false);
      setStoredFileName('');
      setSaveSuccess(true);
      onConfigUpdated();
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleCopyInviteLink = () => {
    const link = generateCoOwnerInviteLink();
    navigator.clipboard.writeText(link);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2500);
  };

  const handleCopyOwnerLink = () => {
    const link = generateOwnerSecretLink();
    navigator.clipboard.writeText(link);
    setCopiedOwnerLink(true);
    setTimeout(() => setCopiedOwnerLink(false), 2500);
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    const updated = { ...roleState, currentRole: newRole };
    setRoleState(updated);
    saveRoleState(updated);
  };

  const handleExportAnalyticsJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `vrcmodmenu-analytics-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Analytics Metrics
  const totalViews = events.filter((e) => e.type === 'PAGE_VIEW').length;
  const totalDownloads = events.filter((e) => e.type === 'DOWNLOAD').length;
  const uniqueUsers = Array.from(new Set(events.map((e) => e.username))).length;
  const conversionRate = totalViews > 0 ? ((totalDownloads / totalViews) * 100).toFixed(1) : '0.0';

  // Filter and Search visitors by name, handle, IP, or city
  const filteredEvents = events.filter((e) => {
    const matchesType = analyticsFilter === 'ALL' || e.type === analyticsFilter;
    if (!matchesType) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const matchName = (e.username || '').toLowerCase().includes(q);
    const matchHandle = (e.handle || '').toLowerCase().includes(q);
    const matchIp = (e.ip || '').toLowerCase().includes(q);
    const matchCity = (e.city || '').toLowerCase().includes(q);
    const matchCountry = (e.country || '').toLowerCase().includes(q);
    const matchDetails = (e.details || '').toLowerCase().includes(q);
    return matchName || matchHandle || matchIp || matchCity || matchCountry || matchDetails;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl border border-white bg-neutral-950 p-6 sm:p-8 max-h-[92vh] overflow-y-auto shadow-[0_0_60px_rgba(255,255,255,0.18)]">
        
        {/* Reticles */}
        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
        <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white" />
        <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white" />
        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-neutral-800 bg-black text-white">
              <PlanetLogo className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                <span>VRC MOD MENU</span>
                <span className="text-neutral-700">/</span>
                <span className="text-white font-semibold">PORTAL MANAGER</span>
                <span className="text-neutral-700">/</span>
                <span className={`px-1.5 py-0.2 border text-[10px] uppercase font-bold ${
                  isOwner ? 'border-white bg-white text-black' : 'border-neutral-500 bg-black text-neutral-300'
                }`}>
                  {roleState.currentRole === 'owner' ? 'OWNER ACCESS' : 'CO-OWNER (CUSTOMIZER)'}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-mono uppercase pt-0.5">
                Portal Operations & AI Telemetry
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-600 transition-colors"
              aria-label="Close portal manager"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 pt-4 pb-4 border-b border-neutral-900 font-mono text-xs">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
              activeTab === 'analytics'
                ? 'border-white bg-white text-black font-bold'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Visitor & Download Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
              activeTab === 'ai'
                ? 'border-white bg-white text-black font-bold'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Orbit AI Sentinel</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
              activeTab === 'files'
                ? 'border-white bg-white text-black font-bold'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            {isOwner ? <HardDrive className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5 text-neutral-500" />}
            <span>Release Files {!isOwner && '(Locked)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('customize')}
            className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
              activeTab === 'customize'
                ? 'border-white bg-white text-black font-bold'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Site Customization</span>
          </button>

          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
              activeTab === 'roles'
                ? 'border-white bg-white text-black font-bold'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Co-Owner & Roles</span>
          </button>
        </div>

        {/* Success Alert */}
        {saveSuccess && (
          <div className="mt-4 border border-white bg-black p-3.5 flex items-center justify-between font-mono text-xs text-white">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-white" />
              <span>Settings successfully saved and synchronized across the live website!</span>
            </div>
          </div>
        )}

        {/* ================= TAB 1: VISITOR & DOWNLOAD TRACKER WITH VISITOR SEARCH ================= */}
        {activeTab === 'analytics' && (
          <div className="mt-6 space-y-6 animate-in fade-in duration-150 font-mono text-xs">
            
            {/* KPI Cards Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border border-neutral-800 bg-black p-4 space-y-1">
                <span className="text-neutral-400 text-[11px] block">TOTAL VIEWS</span>
                <span className="text-2xl font-bold text-white tabular-nums">{totalViews}</span>
                <span className="text-[10px] text-neutral-500 block">Page impressions</span>
              </div>

              <div className="border border-white bg-neutral-900 p-4 space-y-1 shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                <span className="text-neutral-300 text-[11px] block font-semibold">TOTAL DOWNLOADS</span>
                <span className="text-2xl font-bold text-white tabular-nums">{totalDownloads}</span>
                <span className="text-[10px] text-neutral-400 block">Client packages delivered</span>
              </div>

              <div className="border border-neutral-800 bg-black p-4 space-y-1">
                <span className="text-neutral-400 text-[11px] block">UNIQUE VISITORS</span>
                <span className="text-2xl font-bold text-white tabular-nums">{uniqueUsers}</span>
                <span className="text-[10px] text-neutral-500 block">Identified visitor names</span>
              </div>

              <div className="border border-neutral-800 bg-black p-4 space-y-1">
                <span className="text-neutral-400 text-[11px] block">CONVERSION RATE</span>
                <span className="text-2xl font-bold text-white tabular-nums">{conversionRate}%</span>
                <span className="text-[10px] text-neutral-500 block">View-to-download</span>
              </div>
            </div>

            {/* VISITOR NAME SEARCH BAR */}
            <div className="border border-neutral-800 bg-black p-3 space-y-2">
              <div className="flex items-center justify-between text-neutral-400 text-[11px]">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Visitors by Name / Handle / Location</span>
                </span>
                <span>
                  Showing <strong>{filteredEvents.length}</strong> of {events.length} records
                </span>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Type visitor name (e.g. 'Astrid', 'KitsuneModder', 'Chicago', '172.56')..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-9 py-2 border border-neutral-800 bg-neutral-950 text-xs text-white placeholder-neutral-600 focus:border-white focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-2.5 text-neutral-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter and Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1 p-1 border border-neutral-800 bg-black">
                <button
                  onClick={() => setAnalyticsFilter('ALL')}
                  className={`px-3 py-1 transition-colors ${
                    analyticsFilter === 'ALL' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  All ({events.length})
                </button>
                <button
                  onClick={() => setAnalyticsFilter('DOWNLOAD')}
                  className={`px-3 py-1 transition-colors ${
                    analyticsFilter === 'DOWNLOAD' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Downloads ({totalDownloads})
                </button>
                <button
                  onClick={() => setAnalyticsFilter('PAGE_VIEW')}
                  className={`px-3 py-1 transition-colors ${
                    analyticsFilter === 'PAGE_VIEW' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  Page Views ({totalViews})
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('ai')}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-white bg-white text-black font-bold uppercase hover:bg-black hover:text-white transition-colors"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Run AI Audit</span>
                </button>
                <button
                  onClick={handleExportAnalyticsJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-800 bg-black text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
                {isOwner && (
                  <button
                    onClick={() => {
                      if (confirm('Clear all visitor and download logs?')) {
                        clearAnalyticsLogs();
                      }
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-neutral-800 bg-black text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>

            {/* Log Table */}
            <div className="border border-neutral-800 bg-black overflow-hidden">
              <div className="max-h-[360px] overflow-y-auto divide-y divide-neutral-900">
                {filteredEvents.length === 0 ? (
                  <div className="p-8 text-center text-neutral-500 space-y-1">
                    <p>No activity records matched your search query "{searchQuery}".</p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="text-white underline hover:text-neutral-300"
                    >
                      Clear search
                    </button>
                  </div>
                ) : (
                  filteredEvents.map((evt) => {
                    const isDl = evt.type === 'DOWNLOAD';
                    const dateFormatted = new Date(evt.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    });

                    return (
                      <div key={evt.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-neutral-950 transition-colors">
                        <div className="flex items-start sm:items-center gap-3 min-w-0">
                          <span className={`px-2 py-0.5 text-[10px] uppercase font-bold shrink-0 border ${
                            isDl ? 'border-white bg-white text-black' : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                          }`}>
                            {evt.type}
                          </span>
                          
                          <div className="min-w-0 space-y-0.5">
                            {/* Visitor Username & Handle */}
                            <div className="flex items-center gap-2 truncate">
                              <div className="flex items-center gap-1.5 text-white font-bold text-xs truncate">
                                <User className="w-3 h-3 text-neutral-400 shrink-0" />
                                <span className="truncate">{evt.username}</span>
                              </div>
                              {evt.handle && (
                                <span className="text-neutral-400 text-[11px] truncate">
                                  {evt.handle}
                                </span>
                              )}
                              <span className="text-neutral-600">·</span>
                              <span className="text-neutral-400 text-[11px] truncate">
                                {evt.city}, {evt.country}
                              </span>
                            </div>

                            {/* Activity Detail */}
                            <div className="text-[11px] text-neutral-400 truncate">
                              {evt.details}
                            </div>
                          </div>
                        </div>

                        {/* Hardware & Timestamp */}
                        <div className="flex sm:flex-col items-center sm:items-end justify-between text-[10px] text-neutral-400 shrink-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-white font-medium">{evt.os}</span>
                            <span className="text-neutral-600">|</span>
                            <span className="text-neutral-300">{evt.deviceType}</span>
                          </div>
                          <span className="tabular-nums">{dateFormatted}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: ORBIT AI SENTINEL ================= */}
        {activeTab === 'ai' && (
          <div className="mt-6 space-y-6 animate-in fade-in duration-150">
            <OrbitAiSentinel events={events} />
          </div>
        )}

        {/* ================= TAB 3: FILE & RELEASE SETTINGS ================= */}
        {activeTab === 'files' && (
          <div className="mt-6 space-y-6 animate-in fade-in duration-150">
            {!isOwner && (
              <div className="border border-neutral-700 bg-neutral-900/90 p-4 font-mono text-xs text-neutral-300 space-y-1">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Lock className="w-4 h-4" />
                  <span className="uppercase">Permission Restricted (Co-Owner Role)</span>
                </div>
                <p className="text-neutral-400">
                  You are logged in with the <strong>Co-Owner</strong> role. You have permissions to customize site text, versions, and view analytics, but <strong>only the Owner can upload or replace download files</strong>.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <span>1. Upload Release Binary (.zip / .dll / .rar)</span>
                  {!isOwner && <span className="text-neutral-500 font-normal">[Locked for Co-Owners]</span>}
                </span>
                {hasStoredFile && (
                  <span className="text-neutral-300 font-semibold flex items-center gap-1.5">
                    <HardDrive className="w-3.5 h-3.5" />
                    <span>Active: {storedFileName}</span>
                  </span>
                )}
              </div>

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  if (isOwner) setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed p-6 text-center transition-colors ${
                  !isOwner
                    ? 'border-neutral-900 bg-neutral-950/40 opacity-50 cursor-not-allowed'
                    : dragActive
                    ? 'border-white bg-neutral-900'
                    : 'border-neutral-800 bg-black hover:border-neutral-600'
                }`}
              >
                <UploadCloud className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                <p className="text-sm font-medium text-white">
                  {isOwner ? 'Drag and drop your client file here' : 'File upload is restricted to the Owner'}
                </p>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  Stored directly in local binary storage with SHA-256 automatic calculation.
                </p>
                {isOwner && (
                  <label className="mt-4 inline-block border border-white bg-white px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-black cursor-pointer hover:bg-black hover:text-white transition-colors">
                    <span>{isProcessing ? 'Hashing & Saving...' : 'Browse Local Files'}</span>
                    <input
                      type="file"
                      disabled={!isOwner}
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-neutral-900">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="font-bold text-white uppercase tracking-wider">
                  2. Or Provide External Download Link
                </span>
                <span className="text-neutral-500">Google Drive / GitHub Releases / MediaFire</span>
              </div>
              <div className="relative">
                <Link2 className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
                <input
                  type="url"
                  disabled={!isOwner}
                  placeholder="https://..."
                  value={config.customDownloadUrl}
                  onChange={(e) => setConfig({ ...config, customDownloadUrl: e.target.value })}
                  className={`w-full pl-9 pr-3 py-2.5 border border-neutral-800 bg-black text-xs text-white placeholder-neutral-600 font-mono focus:border-white focus:outline-none ${
                    !isOwner ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-neutral-900">
              <span className="font-bold text-white uppercase tracking-wider font-mono text-xs block">
                3. File Attributes & Checksum
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">Download File Name</label>
                  <input
                    type="text"
                    disabled={!isOwner}
                    value={config.fileName}
                    onChange={(e) => setConfig({ ...config, fileName: e.target.value })}
                    className={`w-full px-3 py-2 border border-neutral-800 bg-black text-white focus:border-white focus:outline-none ${
                      !isOwner ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Package Size</label>
                  <input
                    type="text"
                    disabled={!isOwner}
                    value={config.fileSize}
                    onChange={(e) => setConfig({ ...config, fileSize: e.target.value })}
                    className={`w-full px-3 py-2 border border-neutral-800 bg-black text-white focus:border-white focus:outline-none ${
                      !isOwner ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">SHA-256 Signature</label>
                  <input
                    type="text"
                    disabled={!isOwner}
                    value={config.sha256}
                    onChange={(e) => setConfig({ ...config, sha256: e.target.value })}
                    className={`w-full px-3 py-2 border border-neutral-800 bg-black text-white font-mono text-[11px] focus:border-white focus:outline-none ${
                      !isOwner ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  />
                </div>
              </div>
            </div>

            {isOwner && (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveForm}
                  className="flex items-center gap-2 border border-white bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Release File Settings</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: SITE CUSTOMIZATION ================= */}
        {activeTab === 'customize' && (
          <form onSubmit={handleSaveForm} className="mt-6 space-y-6 animate-in fade-in duration-150 font-mono text-xs">
            <div className="border border-neutral-800 bg-black p-4 space-y-1">
              <span className="text-white font-bold uppercase">
                Content & Branding Customizer
              </span>
              <p className="text-neutral-400 text-[11px]">
                Both the Owner and Co-Owner can customize labels, branding, game compatibility, and announcements here.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-neutral-400 block mb-1 font-semibold">Portal Website Name</label>
                <input
                  type="text"
                  value={config.siteName}
                  onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-800 bg-black text-white focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1 font-semibold">Client Name</label>
                <input
                  type="text"
                  value={config.clientName}
                  onChange={(e) => setConfig({ ...config, clientName: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-800 bg-black text-white focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1 font-semibold">Client Version</label>
                <input
                  type="text"
                  value={config.version}
                  onChange={(e) => setConfig({ ...config, version: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-800 bg-black text-white focus:border-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-neutral-400 block mb-1 font-semibold">Game Target Build</label>
                <input
                  type="text"
                  value={config.gameBuild}
                  onChange={(e) => setConfig({ ...config, gameBuild: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-800 bg-black text-white focus:border-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-neutral-400 block mb-1 font-semibold">Live Status Badge Text</label>
                <input
                  type="text"
                  value={config.statusText}
                  onChange={(e) => setConfig({ ...config, statusText: e.target.value })}
                  className="w-full px-3 py-2 border border-neutral-800 bg-black text-white focus:border-white focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 border border-white bg-white px-5 py-2.5 font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Site Customizations</span>
              </button>
            </div>
          </form>
        )}

        {/* ================= TAB 5: ROLES & CO-OWNER MANAGEMENT ================= */}
        {activeTab === 'roles' && (
          <div className="mt-6 space-y-6 animate-in fade-in duration-150 font-mono text-xs">
            <div className="border border-neutral-800 bg-black p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-bold uppercase tracking-wider block">
                    Active Session Role
                  </span>
                  <p className="text-neutral-400 text-[11px] mt-0.5">
                    Select your active view to test what the Owner vs Co-Owner experiences.
                  </p>
                </div>
                <span className={`px-2 py-1 text-xs font-bold border ${
                  roleState.currentRole === 'owner' 
                    ? 'border-white bg-white text-black' 
                    : roleState.currentRole === 'co-owner'
                    ? 'border-neutral-500 bg-neutral-900 text-white'
                    : 'border-neutral-700 bg-neutral-950 text-neutral-400'
                }`}>
                  {roleState.currentRole.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleRoleSwitch('owner')}
                  className={`p-3 border text-left transition-colors ${
                    roleState.currentRole === 'owner'
                      ? 'border-white bg-neutral-900 text-white'
                      : 'border-neutral-800 bg-black text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Owner Role</span>
                    {roleState.currentRole === 'owner' && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Full control: set custom files, customize branding, run AI audits.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSwitch('co-owner')}
                  className={`p-3 border text-left transition-colors ${
                    roleState.currentRole === 'co-owner'
                      ? 'border-white bg-neutral-900 text-white'
                      : 'border-neutral-800 bg-black text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Co-Owner Role</span>
                    {roleState.currentRole === 'co-owner' && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Customizer: can edit site text and view telemetry, cannot change files.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleRoleSwitch('guest');
                    onClose();
                  }}
                  className={`p-3 border text-left transition-colors ${
                    roleState.currentRole === 'guest'
                      ? 'border-white bg-neutral-900 text-white'
                      : 'border-neutral-800 bg-black text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold flex items-center justify-between">
                    <span>Lock / Guest Mode</span>
                    {roleState.currentRole === 'guest' && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <p className="text-[10px] text-neutral-400 mt-1">
                    Standard visitor view. All owner controls and file managers are hidden.
                  </p>
                </button>
              </div>
            </div>

            {/* Owner Secret Direct Access Link */}
            {isOwner && (
              <div className="border border-neutral-800 bg-black p-5 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Lock className="w-4 h-4 text-white" />
                  <span className="uppercase">Owner Direct Bookmark Link (Bypasses Sign In)</span>
                </div>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Bookmark or save this private link. Opening this link automatically authenticates you as <strong>Owner (notnyxo)</strong> with zero passwords or sign-in prompts.
                </p>

                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <div className="flex-1 border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-300 text-[11px] truncate select-all">
                    {generateOwnerSecretLink()}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyOwnerLink}
                    className="flex items-center justify-center gap-2 border border-white bg-white px-4 py-2 font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
                  >
                    {copiedOwnerLink ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedOwnerLink ? 'Owner Link Copied!' : 'Copy Owner Link'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Co-Owner Instant Invite Link */}
            <div className="border border-neutral-800 bg-black p-5 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold">
                <Users className="w-4 h-4" />
                <span className="uppercase">Co-Owner Instant Invite Link</span>
              </div>
              <p className="text-neutral-400 text-xs leading-relaxed">
                Send this link to your friend. When they open the website with this link, they are automatically granted the <strong>Co-Owner</strong> role.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <div className="flex-1 border border-neutral-800 bg-neutral-950 px-3 py-2 text-neutral-300 text-[11px] truncate select-all">
                  {generateCoOwnerInviteLink()}
                </div>
                <button
                  type="button"
                  onClick={handleCopyInviteLink}
                  className="flex items-center justify-center gap-2 border border-white bg-white px-4 py-2 font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors"
                >
                  {copiedInvite ? <Check className="w-3.5 h-3.5 text-black" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedInvite ? 'Link Copied!' : 'Copy Co-Owner Link'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
