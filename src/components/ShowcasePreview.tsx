import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Eye, 
  Maximize2, 
  VolumeX, 
  ShieldCheck, 
  Zap, 
  Radio, 
  Check, 
  RefreshCw,
  AlertTriangle,
  Layers,
  Crosshair
} from 'lucide-react';
import { PlanetLogo } from './PlanetLogo.tsx';

export const ShowcasePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'esp' | 'hud'>('interactive');
  
  // Interactive Simulator State
  const [activeMenuTab, setActiveMenuTab] = useState<'visuals' | 'avatars' | 'protection' | 'performance'>('visuals');
  const [espEnabled, setEspEnabled] = useState(true);
  const [boxEsp, setBoxEsp] = useState(true);
  const [distanceMarkers, setDistanceMarkers] = useState(true);
  const [occlusionCulling, setOcclusionCulling] = useState(true);
  
  const [clonerEnabled, setClonerEnabled] = useState(true);
  const [boneLimiter, setBoneLimiter] = useState(true);
  const [forceFallbackShader, setForceFallbackShader] = useState(false);
  
  const [antiCrashActive, setAntiCrashActive] = useState(true);
  const [earProtection, setEarProtection] = useState(true);
  const [vertexGate, setVertexGate] = useState(true);
  
  const [fovMultiplier, setFovMultiplier] = useState(95);
  const [fpsCap, setFpsCap] = useState(120);
  const [particleLimit, setParticleLimit] = useState(2500);

  // Live telemetry ticker simulation
  const [simulatedFps, setSimulatedFps] = useState(119.8);
  const [simulatedPing, setSimulatedPing] = useState(38);
  const [crashEventsBlocked, setCrashEventsBlocked] = useState(4);
  const [lastLog, setLastLog] = useState('All systems nominal. Ready in instance #8192-US.');

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedFps(Number((118 + Math.random() * 3).toFixed(1)));
      setSimulatedPing(Math.floor(35 + Math.random() * 6));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const triggerTestExploit = () => {
    setCrashEventsBlocked((prev) => prev + 1);
    setLastLog('Blocked: Corrupted geometry shader packet from [Unknown User]');
    setTimeout(() => {
      setLastLog('Memory state sanitized. 0 dropped frames.');
    }, 2500);
  };

  return (
    <section id="showcase" className="relative border-b border-neutral-900 bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-900">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>INTERFACE SHOWCASE</span>
              <span className="text-neutral-700">/</span>
              <span>LIVE SYSTEM PREVIEW</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-mono uppercase">
              Monochrome In Action
            </h2>
          </div>

          {/* Interactive Switcher Tabs */}
          <div className="flex items-center p-1 border border-neutral-800 bg-neutral-950 font-mono text-xs">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`px-4 py-2 transition-colors whitespace-nowrap ${
                activeTab === 'interactive'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Interactive Menu HUD
            </button>
            <button
              onClick={() => setActiveTab('esp')}
              className={`px-4 py-2 transition-colors whitespace-nowrap ${
                activeTab === 'esp'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Spatial ESP Wireframe
            </button>
            <button
              onClick={() => setActiveTab('hud')}
              className={`px-4 py-2 transition-colors whitespace-nowrap ${
                activeTab === 'hud'
                  ? 'bg-white text-black font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Telemetry Overlay
            </button>
          </div>
        </div>

        {/* Stark Framing Area with White Shadow Accent */}
        <div className="mt-12 relative border border-neutral-800 bg-neutral-950 p-2 sm:p-4 lg:p-6 shadow-[0_0_50px_rgba(255,255,255,0.08)]">
          
          {/* Stark Corner Reticles */}
          <div className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-white" />
          <div className="absolute -top-1.5 -right-1.5 w-4 h-4 border-t-2 border-r-2 border-white" />
          <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 border-b-2 border-l-2 border-white" />
          <div className="absolute -bottom-1.5 -right-1.5 w-4 h-4 border-b-2 border-r-2 border-white" />

          {/* Frame Top Info Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-900 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <PlanetLogo className="w-4 h-4" />
                <span>ORBIT.EXE</span>
              </div>
              <span className="text-neutral-700">|</span>
              <span>RENDER PASS: DIRECT3D 11</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">FRAME: <strong className="text-white">{simulatedFps} FPS</strong></span>
              <span className="hidden sm:inline">PING: <strong className="text-white">{simulatedPing}ms</strong></span>
              <span className="text-neutral-200 border border-neutral-800 px-2 py-0.5 bg-black">
                {activeTab === 'interactive' ? 'MODE: LIVE SIMULATOR' : 'MODE: PHOTOMETRIC CAPTURE'}
              </span>
            </div>
          </div>

          {/* Viewport Content */}
          <div className="mt-4 relative bg-black min-h-[520px] flex items-center justify-center overflow-hidden border border-neutral-900">
            
            {/* TAB 1: INTERACTIVE MENU SIMULATOR */}
            {activeTab === 'interactive' && (
              <div className="w-full h-full p-4 sm:p-8 flex flex-col justify-between">
                
                {/* Virtual Mod Menu Window */}
                <div className="w-full max-w-4xl mx-auto border border-neutral-700 bg-neutral-950 p-6 shadow-2xl">
                  
                  {/* Menu Window Titlebar */}
                  <div className="flex items-center justify-between pb-4 border-b border-neutral-800 font-mono">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 bg-white" />
                      <span className="font-bold tracking-widest text-sm text-white uppercase">
                        ORBIT // CLIENT MENU [V2.4.1]
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 flex items-center gap-3">
                      <span>KEYBIND: [INSERT]</span>
                      <span className="text-neutral-700">|</span>
                      <span className="text-white">HOT-RELOAD ON</span>
                    </div>
                  </div>

                  {/* Internal Menu Tabs */}
                  <div className="grid grid-cols-4 gap-2 pt-4 pb-6 border-b border-neutral-900 font-mono text-xs">
                    <button
                      onClick={() => setActiveMenuTab('visuals')}
                      className={`py-2 px-3 border transition-colors flex items-center justify-center gap-2 ${
                        activeMenuTab === 'visuals'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="truncate">Visual ESP</span>
                    </button>
                    <button
                      onClick={() => setActiveMenuTab('avatars')}
                      className={`py-2 px-3 border transition-colors flex items-center justify-center gap-2 ${
                        activeMenuTab === 'avatars'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span className="truncate">Avatar Tools</span>
                    </button>
                    <button
                      onClick={() => setActiveMenuTab('protection')}
                      className={`py-2 px-3 border transition-colors flex items-center justify-center gap-2 ${
                        activeMenuTab === 'protection'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="truncate">Protection</span>
                    </button>
                    <button
                      onClick={() => setActiveMenuTab('performance')}
                      className={`py-2 px-3 border transition-colors flex items-center justify-center gap-2 ${
                        activeMenuTab === 'performance'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <Zap className="w-3.5 h-3.5" />
                      <span className="truncate">Engine</span>
                    </button>
                  </div>

                  {/* Menu Tab Body */}
                  <div className="py-6 min-h-[220px]">
                    {activeMenuTab === 'visuals' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <span className="text-sm font-medium text-white">Master ESP Overlay</span>
                            <input
                              type="checkbox"
                              checked={espEnabled}
                              onChange={(e) => setEspEnabled(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <span className="text-sm font-medium text-white">Wireframe Bounding Box</span>
                            <input
                              type="checkbox"
                              checked={boxEsp}
                              onChange={(e) => setBoxEsp(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <span className="text-sm font-medium text-white">Distance Markers (m)</span>
                            <input
                              type="checkbox"
                              checked={distanceMarkers}
                              onChange={(e) => setDistanceMarkers(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <span className="text-sm font-medium text-white">Occlusion Culling</span>
                            <input
                              type="checkbox"
                              checked={occlusionCulling}
                              onChange={(e) => setOcclusionCulling(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>
                        </div>

                        <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span>Status: {espEnabled ? 'ACTIVE (Drawing 14 nearby rigs)' : 'DISABLED'}</span>
                          <span>HOTKEY: [F4]</span>
                        </div>
                      </div>
                    )}

                    {activeMenuTab === 'avatars' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <span className="text-sm font-medium text-white">Pedestal Avatar Cloner</span>
                            <input
                              type="checkbox"
                              checked={clonerEnabled}
                              onChange={(e) => setClonerEnabled(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <span className="text-sm font-medium text-white">Dynamic Bone Limiter</span>
                            <input
                              type="checkbox"
                              checked={boneLimiter}
                              onChange={(e) => setBoneLimiter(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors col-span-1 sm:col-span-2">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-white">Force Safe Fallback Shader</span>
                              <span className="text-xs text-neutral-400 font-mono">Bypasses corrupted or flashing screen shaders</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={forceFallbackShader}
                              onChange={(e) => setForceFallbackShader(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>
                        </div>
                        <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span>Bone Clamp: 256 transforms</span>
                          <span>HOTKEY: [F3]</span>
                        </div>
                      </div>
                    )}

                    {activeMenuTab === 'protection' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <span className="text-sm font-medium text-white">Anti-Crash Shield</span>
                            <input
                              type="checkbox"
                              checked={antiCrashActive}
                              onChange={(e) => setAntiCrashActive(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <span className="text-sm font-medium text-white">Audio Burst Limiter (0dB)</span>
                            <input
                              type="checkbox"
                              checked={earProtection}
                              onChange={(e) => setEarProtection(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors col-span-1 sm:col-span-2">
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-white">Malformed Vertex Gate</span>
                              <span className="text-xs text-neutral-400 font-mono">Drops crash avatars exceeding vertex array memory bounds</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={vertexGate}
                              onChange={(e) => setVertexGate(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>
                        </div>

                        {/* Interactive exploit test trigger */}
                        <div className="p-3 border border-neutral-800 bg-black flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                            <ShieldCheck className="w-4 h-4 text-white" />
                            <span>Exploits Intercepted: <strong className="text-white">{crashEventsBlocked}</strong></span>
                          </div>
                          <button
                            onClick={triggerTestExploit}
                            className="px-3 py-1.5 border border-neutral-600 text-xs font-mono text-white hover:bg-white hover:text-black hover:border-white transition-all uppercase"
                          >
                            Simulate Crash Attack
                          </button>
                        </div>
                      </div>
                    )}

                    {activeMenuTab === 'performance' && (
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-neutral-400">Field of View Override</span>
                            <span className="text-white font-semibold">{fovMultiplier}° FOV</span>
                          </div>
                          <input
                            type="range"
                            min="60"
                            max="120"
                            value={fovMultiplier}
                            onChange={(e) => setFovMultiplier(Number(e.target.value))}
                            className="w-full accent-white bg-neutral-800 cursor-pointer h-1.5"
                          />
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-neutral-400">Particle Cap Per Model</span>
                            <span className="text-white font-semibold">{particleLimit} particles</span>
                          </div>
                          <input
                            type="range"
                            min="500"
                            max="5000"
                            step="100"
                            value={particleLimit}
                            onChange={(e) => setParticleLimit(Number(e.target.value))}
                            className="w-full accent-white bg-neutral-800 cursor-pointer h-1.5"
                          />
                        </div>

                        <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span>VR Sync: 120 Hz Target</span>
                          <span>Micro-Stutter Guard: ACTIVE</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Window Bottom Console Log */}
                  <div className="pt-3 border-t border-neutral-800 flex items-center justify-between font-mono text-[11px] text-neutral-400">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-white font-bold">&gt;</span>
                      <span className="truncate">{lastLog}</span>
                    </div>
                    <span className="text-neutral-500 shrink-0 ml-2">JSON: SYNCED</span>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: SPATIAL ESP WIREFRAME PREVIEW */}
            {activeTab === 'esp' && (
              <div className="relative w-full h-full min-h-[500px]">
                <img
                  src="/src/assets/images/orbit_vr_esp_preview_1793385763987.jpg"
                  alt="VRChat Wireframe ESP and Spatial Telemetry Preview"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Overlaid Annotation Pin 1 */}
                <div className="absolute top-[28%] left-[32%] border border-white bg-black/90 p-2 font-mono text-[11px] text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white" />
                    <span className="font-bold">USER: ASTRID</span>
                  </div>
                  <div className="text-neutral-400 text-[10px]">
                    4.2m · TRUST: KNOWN · 98k TRIS
                  </div>
                </div>

                {/* Overlaid Annotation Pin 2 */}
                <div className="absolute top-[38%] left-[58%] border border-white bg-black/90 p-2 font-mono text-[11px] text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white" />
                    <span className="font-bold">USER: VECTOR</span>
                  </div>
                  <div className="text-neutral-400 text-[10px]">
                    11.8m · TRUST: USER · OCCLUDED
                  </div>
                </div>

                {/* Bottom Overlay Legend */}
                <div className="absolute bottom-4 inset-x-4 border border-neutral-800 bg-black/85 backdrop-blur-sm p-3 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-300">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-bold">SPATIAL TELEMETRY:</span>
                    <span>Direct3D 11 Stencil Bounds</span>
                    <span className="text-neutral-700">|</span>
                    <span>Distance Calculation: Euclidean</span>
                  </div>
                  <span className="text-neutral-400">HOTKEY: [F4]</span>
                </div>
              </div>
            )}

            {/* TAB 3: HUD TELEMETRY PREVIEW */}
            {activeTab === 'hud' && (
              <div className="relative w-full h-full min-h-[500px]">
                <img
                  src="/src/assets/images/orbit_hud_interface_1793385763826.jpg"
                  alt="Orbit Monochrome HUD and Telemetry Overlay View"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />

                <div className="absolute bottom-4 inset-x-4 border border-neutral-800 bg-black/85 backdrop-blur-sm p-3 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-300">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-bold">MINIMAL HUD OVERLAY:</span>
                    <span>Non-intrusive peripheral wireframe projection</span>
                  </div>
                  <span className="text-neutral-400">HOTKEY: [INS]</span>
                </div>
              </div>
            )}

          </div>

          {/* Frame Bottom Specs Bar */}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-neutral-900 pt-3 font-mono text-xs text-neutral-400">
            <div>
              <span>Engine: </span>
              <strong className="text-white font-medium">Orbit Universal Direct3D Hook</strong>
            </div>
            <div className="flex items-center gap-4">
              <span>Resolution: Dynamic VR Viewport</span>
              <span className="text-neutral-700">·</span>
              <span className="text-white">Strict Monochrome Palette</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
