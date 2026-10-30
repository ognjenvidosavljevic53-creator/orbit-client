import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  Eye, 
  ShieldCheck, 
  Zap, 
  Radio, 
  Check, 
  Layers,
  Crosshair,
  Wind,
  Flame,
  Swords,
  Fingerprint,
  Skull,
  UserCheck,
  Compass,
  Gauge
} from 'lucide-react';
import { PlanetLogo } from './PlanetLogo.tsx';

export const ShowcasePreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'interactive' | 'esp' | 'hud'>('interactive');
  
  // Interactive Simulator Tab
  const [activeMenuTab, setActiveMenuTab] = useState<'movement' | 'amongus' | 'boxing' | 'spoof' | 'visuals' | 'protection'>('movement');

  // Movement & Flight State
  const [flyEnabled, setFlyEnabled] = useState(true);
  const [flySpeed, setFlySpeed] = useState(3.5);
  const [speedMultiplier, setSpeedMultiplier] = useState(2.0);
  const [noClip, setNoClip] = useState(false);
  const [infiniteJump, setInfiniteJump] = useState(true);

  // Among Us World State
  const [forceImpostor, setForceImpostor] = useState(true);
  const [revealImpostors, setRevealImpostors] = useState(true);
  const [autoTasks, setAutoTasks] = useState(false);
  const [infiniteKillRange, setInfiniteKillRange] = useState(true);
  const [bypassMeetingTimer, setBypassMeetingTimer] = useState(true);

  // VRC Boxing World State
  const [doubleHitboxes, setDoubleHitboxes] = useState(true);
  const [instaCrits, setInstaCrits] = useState(true);
  const [reachMultiplier, setReachMultiplier] = useState(2.5);
  const [infiniteStamina, setInfiniteStamina] = useState(true);
  const [autoDodge, setAutoDodge] = useState(false);

  // Spoof & Stealth State
  const [spoofAuthor, setSpoofAuthor] = useState(true);
  const [customAuthorName, setCustomAuthorName] = useState('Official_VRC_Creator');
  const [spoofPlatform, setSpoofPlatform] = useState<'Quest' | 'Desktop'>('Desktop');
  const [hwidScramble, setHwidScramble] = useState(true);
  const [staffDetector, setStaffDetector] = useState(true);

  // Visuals & Protection State
  const [espEnabled, setEspEnabled] = useState(true);
  const [boxEsp, setBoxEsp] = useState(true);
  const [distanceMarkers, setDistanceMarkers] = useState(true);
  const [antiCrashActive, setAntiCrashActive] = useState(true);
  const [earProtection, setEarProtection] = useState(true);
  const [vertexGate, setVertexGate] = useState(true);

  // Live telemetry ticker simulation
  const [simulatedFps, setSimulatedFps] = useState(119.8);
  const [simulatedPing, setSimulatedPing] = useState(38);
  const [lastLog, setLastLog] = useState('Orbit Core loaded. Movement & World Modules ready.');

  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedFps(Number((118 + Math.random() * 3).toFixed(1)));
      setSimulatedPing(Math.floor(35 + Math.random() * 6));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const triggerKillAll = () => {
    setLastLog('[AmongUs.Exploit] Executed Kill All routine: 8 players neutralized');
    setTimeout(() => {
      setLastLog('[AmongUs] Round ended. Victory awarded to Impostors.');
    }, 2500);
  };

  const triggerMakeAllImpostors = () => {
    setLastLog('[AmongUs.Sync] Broadcasted role-override: All players set to IMPOSTOR');
    setTimeout(() => {
      setLastLog('[AmongUs] Global sabotage unlocked for all players.');
    }, 2500);
  };

  const triggerInstaKnockout = () => {
    setLastLog('[Boxing.Critical] Dealt 9,999 damage via Double-Hitbox hook! Opponent knocked down.');
    setTimeout(() => {
      setLastLog('[Boxing] Match WON by instant TKO.');
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
              <span>INTERACTIVE SHOWCASE</span>
              <span className="text-neutral-700">/</span>
              <span>WORLD HACKS & MOVEMENT SUITE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-mono uppercase">
              Showcase & Modules
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
              Interactive In-Menu Simulator
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
                <span>ORBIT // WORLD ENGINE</span>
              </div>
              <span className="text-neutral-700">|</span>
              <span>ACTIVE WORLD HOOKS: VRC BOXING & AMONG US READY</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">FRAME: <strong className="text-white">{simulatedFps} FPS</strong></span>
              <span className="hidden sm:inline">PING: <strong className="text-white">{simulatedPing}ms</strong></span>
              <span className="text-neutral-200 border border-neutral-800 px-2 py-0.5 bg-black">
                {activeTab === 'interactive' ? 'MODE: LIVE SIMULATOR' : 'MODE: CAPTURE'}
              </span>
            </div>
          </div>

          {/* Viewport Content */}
          <div className="mt-4 relative bg-black min-h-[580px] flex items-center justify-center overflow-hidden border border-neutral-900">
            
            {/* TAB 1: INTERACTIVE MENU SIMULATOR */}
            {activeTab === 'interactive' && (
              <div className="w-full h-full p-3 sm:p-6 flex flex-col justify-between">
                
                {/* Virtual Mod Menu Window */}
                <div className="w-full max-w-4xl mx-auto border border-neutral-700 bg-neutral-950 p-5 sm:p-6 shadow-2xl">
                  
                  {/* Menu Window Titlebar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-neutral-800 font-mono gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-2.5 h-2.5 bg-white" />
                      <span className="font-bold tracking-widest text-sm text-white uppercase">
                        ORBIT // CLIENT MENU — ADVANCED WORLD & MOVEMENT EXPLOITS
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400 flex items-center gap-3">
                      <span>HOTKEY: [INSERT]</span>
                      <span className="text-neutral-700">|</span>
                      <span className="text-white">DIRECT3D HOOK: ON</span>
                    </div>
                  </div>

                  {/* Internal Menu Tabs (6 Tabs) */}
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-4 pb-5 border-b border-neutral-900 font-mono text-xs">
                    
                    <button
                      onClick={() => setActiveMenuTab('movement')}
                      className={`py-2 px-2 border transition-colors flex items-center justify-center gap-1.5 ${
                        activeMenuTab === 'movement'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <Wind className="w-3.5 h-3.5" />
                      <span className="truncate">Fly & Speed</span>
                    </button>

                    <button
                      onClick={() => setActiveMenuTab('amongus')}
                      className={`py-2 px-2 border transition-colors flex items-center justify-center gap-1.5 ${
                        activeMenuTab === 'amongus'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <Flame className="w-3.5 h-3.5" />
                      <span className="truncate">Among Us</span>
                    </button>

                    <button
                      onClick={() => setActiveMenuTab('boxing')}
                      className={`py-2 px-2 border transition-colors flex items-center justify-center gap-1.5 ${
                        activeMenuTab === 'boxing'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <Swords className="w-3.5 h-3.5" />
                      <span className="truncate">VRC Boxing</span>
                    </button>

                    <button
                      onClick={() => setActiveMenuTab('spoof')}
                      className={`py-2 px-2 border transition-colors flex items-center justify-center gap-1.5 ${
                        activeMenuTab === 'spoof'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <Fingerprint className="w-3.5 h-3.5" />
                      <span className="truncate">Author Spoof</span>
                    </button>

                    <button
                      onClick={() => setActiveMenuTab('visuals')}
                      className={`py-2 px-2 border transition-colors flex items-center justify-center gap-1.5 ${
                        activeMenuTab === 'visuals'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="truncate">Visual ESP</span>
                    </button>

                    <button
                      onClick={() => setActiveMenuTab('protection')}
                      className={`py-2 px-2 border transition-colors flex items-center justify-center gap-1.5 ${
                        activeMenuTab === 'protection'
                          ? 'border-white bg-white text-black font-bold'
                          : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span className="truncate">Anti-Crash</span>
                    </button>

                  </div>

                  {/* Menu Tab Body */}
                  <div className="py-5 min-h-[260px]">
                    
                    {/* TAB: MOVEMENT & FLY & SPEED */}
                    {activeMenuTab === 'movement' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Fly Mode (Physics Glide)</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Space/C for Vertical Elevation</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={flyEnabled}
                              onChange={(e) => {
                                setFlyEnabled(e.target.checked);
                                setLastLog(e.target.checked ? '[Movement] Fly Mode ENGAGED. Free-flight enabled.' : '[Movement] Fly Mode disabled.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">NoClip / Phase Through Walls</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Bypasses world collider boundaries</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={noClip}
                              onChange={(e) => {
                                setNoClip(e.target.checked);
                                setLastLog(e.target.checked ? '[Movement] NoClip ACTIVE. Meshes bypassed.' : '[Movement] Collisions restored.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Infinite Air Jump</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Reset jump counter on air-press</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={infiniteJump}
                              onChange={(e) => {
                                setInfiniteJump(e.target.checked);
                                setLastLog(e.target.checked ? '[Movement] Infinite Jump ENABLED' : '[Movement] Jump reset');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <div className="p-3 border border-neutral-800 bg-black space-y-2">
                            <div className="flex justify-between text-xs font-mono">
                              <span className="text-neutral-400">Flight Speed Multiplier</span>
                              <span className="text-white font-bold">{flySpeed}x</span>
                            </div>
                            <input
                              type="range"
                              min="1"
                              max="10"
                              step="0.5"
                              value={flySpeed}
                              onChange={(e) => {
                                setFlySpeed(Number(e.target.value));
                                setLastLog(`[Movement] Flight speed set to ${e.target.value}x`);
                              }}
                              className="w-full accent-white bg-neutral-800 cursor-pointer h-1.5"
                            />
                          </div>
                        </div>

                        <div className="p-3 border border-neutral-800 bg-black space-y-2">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-neutral-400">Ground Sprint Speed Hack Multiplier</span>
                            <span className="text-white font-bold">{speedMultiplier}x Velocity</span>
                          </div>
                          <input
                            type="range"
                            min="1.0"
                            max="5.0"
                            step="0.2"
                            value={speedMultiplier}
                            onChange={(e) => {
                              setSpeedMultiplier(Number(e.target.value));
                              setLastLog(`[Movement] Player walk/sprint velocity scaled to ${e.target.value}x`);
                            }}
                            className="w-full accent-white bg-neutral-800 cursor-pointer h-1.5"
                          />
                        </div>
                      </div>
                    )}

                    {/* TAB: AMONG US WORLD HACKS */}
                    {activeMenuTab === 'amongus' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Make Impostor Yourself (Force Role)</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Forces local game state to Impostor</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={forceImpostor}
                              onChange={(e) => {
                                setForceImpostor(e.target.checked);
                                setLastLog(e.target.checked ? '[AmongUs] Force Impostor ACTIVE. Sabotage & Vents unlocked.' : '[AmongUs] Role reset to server sync.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Reveal All Impostors (ESP Glow)</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Outlines active impostors in bright white</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={revealImpostors}
                              onChange={(e) => {
                                setRevealImpostors(e.target.checked);
                                setLastLog(e.target.checked ? '[AmongUs] Impostor radar active: 2 impostors highlighted.' : '[AmongUs] Wallhack disabled.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Infinite Kill Range (Across Map)</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Removes distance proximity check</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={infiniteKillRange}
                              onChange={(e) => {
                                setInfiniteKillRange(e.target.checked);
                                setLastLog(e.target.checked ? '[AmongUs] Kill reach extended to infinite distance.' : '[AmongUs] Normal kill range.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Bypass Emergency & Meeting Timer</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Skip discussion clock instantly</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={bypassMeetingTimer}
                              onChange={(e) => {
                                setBypassMeetingTimer(e.target.checked);
                                setLastLog(e.target.checked ? '[AmongUs] Meeting vote timer bypass ACTIVE.' : '[AmongUs] Timer normal.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                        </div>

                        {/* Interactive Execution Triggers */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <button
                            type="button"
                            onClick={triggerKillAll}
                            className="p-3 border border-white bg-white text-black font-bold uppercase hover:bg-black hover:text-white hover:border-white transition-all flex items-center justify-center gap-2 font-mono text-xs shadow-[0_0_15px_rgba(255,255,255,0.12)]"
                          >
                            <Skull className="w-4 h-4" />
                            <span>Trigger: Kill All (Insta-Wipe)</span>
                          </button>

                          <button
                            type="button"
                            onClick={triggerMakeAllImpostors}
                            className="p-3 border border-neutral-700 bg-black text-white font-bold uppercase hover:border-white transition-all flex items-center justify-center gap-2 font-mono text-xs"
                          >
                            <Flame className="w-4 h-4" />
                            <span>Trigger: Make All Impostors</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* TAB: VRC BOXING WORLD */}
                    {activeMenuTab === 'boxing' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Double Hitboxes (Reach Expander)</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Doubles fist & glove collision trigger</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={doubleHitboxes}
                              onChange={(e) => {
                                setDoubleHitboxes(e.target.checked);
                                setLastLog(e.target.checked ? '[Boxing] Double Hitbox ACTIVE (2.5x reach).' : '[Boxing] Standard hitboxes.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Instant Criticals (100% Crits)</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Forces every punch to deal max critical</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={instaCrits}
                              onChange={(e) => {
                                setInstaCrits(e.target.checked);
                                setLastLog(e.target.checked ? '[Boxing] Insta-Crits ENABLED (Always 3.0x Damage).' : '[Boxing] Normal damage values.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Infinite Guard & Stamina</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Stamina meter never drains on punches</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={infiniteStamina}
                              onChange={(e) => {
                                setInfiniteStamina(e.target.checked);
                                setLastLog(e.target.checked ? '[Boxing] Infinite Stamina lock ENGAGED.' : '[Boxing] Stamina normal.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Auto-Dodge Reaction Hook</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Micro-slips incoming hooks automatically</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={autoDodge}
                              onChange={(e) => {
                                setAutoDodge(e.target.checked);
                                setLastLog(e.target.checked ? '[Boxing] Auto-Dodge hook activated.' : '[Boxing] Manual dodge.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                        </div>

                        {/* Reach Slider */}
                        <div className="p-3 border border-neutral-800 bg-black space-y-2">
                          <div className="flex justify-between text-xs font-mono">
                            <span className="text-neutral-400">Boxing Reach Multiplier</span>
                            <span className="text-white font-bold">{reachMultiplier}x Normal Distance</span>
                          </div>
                          <input
                            type="range"
                            min="1.0"
                            max="4.0"
                            step="0.25"
                            value={reachMultiplier}
                            onChange={(e) => {
                              setReachMultiplier(Number(e.target.value));
                              setLastLog(`[Boxing] Glove reach multiplier set to ${e.target.value}x`);
                            }}
                            className="w-full accent-white bg-neutral-800 cursor-pointer h-1.5"
                          />
                        </div>

                        {/* Interactive Execution Trigger */}
                        <button
                          type="button"
                          onClick={triggerInstaKnockout}
                          className="w-full p-3 border border-white bg-white text-black font-bold uppercase hover:bg-black hover:text-white hover:border-white transition-all flex items-center justify-center gap-2 font-mono text-xs shadow-[0_0_15px_rgba(255,255,255,0.12)]"
                        >
                          <Swords className="w-4 h-4" />
                          <span>Simulate: Instant KO Punch (Max Critical Hit)</span>
                        </button>
                      </div>
                    )}

                    {/* TAB: SPOOF & STEALTH */}
                    {activeMenuTab === 'spoof' && (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          
                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Spoof Author / Creator ID</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Fakes avatar authorship to bypass creator locks</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={spoofAuthor}
                              onChange={(e) => {
                                setSpoofAuthor(e.target.checked);
                                setLastLog(e.target.checked ? `[Spoof] Avatar Author ID spoofed to '${customAuthorName}'` : '[Spoof] Author signature reset.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Hardware ID (HWID) Scrambler</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Regenerates random MAC/UUID on startup</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={hwidScramble}
                              onChange={(e) => {
                                setHwidScramble(e.target.checked);
                                setLastLog(e.target.checked ? '[Spoof] HWID randomized: 9a7b:e410:3f88' : '[Spoof] HWID default.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 border border-neutral-800 bg-black cursor-pointer hover:border-neutral-600 transition-colors">
                            <div>
                              <span className="text-sm font-medium text-white block">Staff & Moderator Proximity Alert</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Warns when VRChat dev/mod joins instance</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={staffDetector}
                              onChange={(e) => {
                                setStaffDetector(e.target.checked);
                                setLastLog(e.target.checked ? '[Spoof] Staff Sentinel ACTIVE (Monitoring trust levels).' : '[Spoof] Sentinel off.');
                              }}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>

                          <div className="p-3 border border-neutral-800 bg-black flex items-center justify-between">
                            <div>
                              <span className="text-sm font-medium text-white block">Platform Identity Spoof</span>
                              <span className="text-[11px] text-neutral-400 font-mono">Spoof Quest vs PC client packet</span>
                            </div>
                            <select
                              value={spoofPlatform}
                              onChange={(e) => {
                                const val = e.target.value as 'Quest' | 'Desktop';
                                setSpoofPlatform(val);
                                setLastLog(`[Spoof] Platform packet spoofed to: ${val}`);
                              }}
                              className="border border-neutral-700 bg-neutral-900 text-white px-2 py-1 text-xs font-mono"
                            >
                              <option value="Desktop">Desktop PC (SteamVR)</option>
                              <option value="Quest">Oculus Quest Standalone</option>
                            </select>
                          </div>

                        </div>

                        {/* Custom Author Name Input */}
                        <div className="p-3 border border-neutral-800 bg-black space-y-1.5 font-mono text-xs">
                          <label className="text-neutral-400 block">Spoofed Author Identity Tag:</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={customAuthorName}
                              onChange={(e) => setCustomAuthorName(e.target.value)}
                              className="flex-1 px-3 py-1.5 border border-neutral-800 bg-neutral-950 text-white focus:border-white focus:outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => setLastLog(`[Spoof.Engine] Custom Author Name applied: '${customAuthorName}'`)}
                              className="px-3 py-1.5 border border-white bg-white text-black font-bold uppercase hover:bg-black hover:text-white transition-colors"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* TAB: VISUAL ESP */}
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
                              defaultChecked={true}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>
                        </div>
                        <div className="pt-2 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400">
                          <span>Status: Direct3D 11 Stencil Bounds Active</span>
                          <span>HOTKEY: [F4]</span>
                        </div>
                      </div>
                    )}

                    {/* TAB: ANTI-CRASH */}
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
                              <span className="text-xs text-neutral-400 font-mono">Drops crash avatars exceeding vertex memory bounds</span>
                            </div>
                            <input
                              type="checkbox"
                              checked={vertexGate}
                              onChange={(e) => setVertexGate(e.target.checked)}
                              className="w-4 h-4 accent-white rounded-none cursor-pointer"
                            />
                          </label>
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
                    <span className="text-white font-bold shrink-0 ml-2">SIMULATOR ACTIVE</span>
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

                <div className="absolute top-[28%] left-[32%] border border-white bg-black/90 p-2 font-mono text-[11px] text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white" />
                    <span className="font-bold">USER: ASTRID</span>
                  </div>
                  <div className="text-neutral-400 text-[10px]">
                    4.2m · TRUST: KNOWN · 98k TRIS
                  </div>
                </div>

                <div className="absolute top-[38%] left-[58%] border border-white bg-black/90 p-2 font-mono text-[11px] text-white">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-white" />
                    <span className="font-bold">USER: VECTOR</span>
                  </div>
                  <div className="text-neutral-400 text-[10px]">
                    11.8m · TRUST: USER · OCCLUDED
                  </div>
                </div>

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
              <strong className="text-white font-medium">Orbit Universal Direct3D Hook & World Modules</strong>
            </div>
            <div className="flex items-center gap-4">
              <span>World Presets: Among Us / VRC Boxing / Movement</span>
              <span className="text-neutral-700">·</span>
              <span className="text-white">Strict Monochrome Palette</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
