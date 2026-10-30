import React, { useState } from 'react';
import { 
  UserCheck, 
  Scan, 
  SlidersHorizontal, 
  Zap, 
  ShieldAlert, 
  Lock, 
  Check, 
  ChevronRight,
  Sparkles,
  Layers,
  Settings
} from 'lucide-react';

interface FeatureItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  highlights: string[];
  specs: { label: string; value: string }[];
}

const features: FeatureItem[] = [
  {
    id: 'avatar-tools',
    number: '01',
    title: 'Avatar Tools',
    subtitle: 'Inspection & Fallback Hierarchy',
    icon: UserCheck,
    description: 'Direct in-world inspection of avatar rigs, bone counts, mesh hierarchies, and pedestal copying without touching external cache scrapers.',
    highlights: [
      'Instant pedestal avatar cloning with permission respect',
      'Dynamic bone weight limiters for packed public instances',
      'One-click fallback shader override for unoptimized models',
      'Local bone scale calibration and eye height lock'
    ],
    specs: [
      { label: 'Latency Overhead', value: '< 0.2ms' },
      { label: 'Max Bone Clamp', value: '256 transforms' },
      { label: 'Hot-Swap Key', value: '[F3]' }
    ]
  },
  {
    id: 'visual-esp',
    number: '02',
    title: 'Visual ESP & Telemetry',
    subtitle: 'Occlusion-Tested Wireframes',
    icon: Scan,
    description: 'Crisp monochromatic wireframe bounding boxes and spatial radar. Accurately pinpoint friends, trusted users, and world triggers through walls.',
    highlights: [
      'Stark monochrome 2D & 3D wireframe bounding boxes',
      'Subtle distance indicators with millimeter accuracy',
      'User trust rank icons (Visitor, New, User, Known, Trusted)',
      'Occlusion-aware vertex culling to prevent screen clutter'
    ],
    specs: [
      { label: 'Render Pass', value: 'Direct3D11 Stencil' },
      { label: 'Max Distance', value: '150 meters' },
      { label: 'Hot-Swap Key', value: '[F4]' }
    ]
  },
  {
    id: 'qol-utilities',
    number: '03',
    title: 'QoL Utilities',
    subtitle: 'Streamlined In-Game Workflows',
    icon: SlidersHorizontal,
    description: 'Essential workflow boosters built directly into the quick radial wheel. Reconnect after instance drops, override FOV, and lock audio thresholds.',
    highlights: [
      'Automatic world re-join with last known spawn position',
      'Desktop & VR field of view multiplier (60° to 125°)',
      'Global microphone noise clamp and mute indicator',
      'Instant flight toggle with physics-based smooth gliding'
    ],
    specs: [
      { label: 'Re-join Delay', value: 'Instant / 1.5s' },
      { label: 'Audio Limiter', value: '0.0 dB Normalizer' },
      { label: 'Hot-Swap Key', value: '[F8] / [END]' }
    ]
  },
  {
    id: 'performance',
    number: '04',
    title: 'Performance Engine',
    subtitle: 'Micro-Stutter Suppression',
    icon: Zap,
    description: 'Reclaim precious frame budgets in unoptimized 80-player worlds. Enforces hard limits on runaway particles, lights, and GPU cloth simulations.',
    highlights: [
      'Real-time particle system cap (max 2,000 / avatar)',
      'Dynamic cloth & spring physics distance culling',
      'Audio source count limit to stop CPU audio-engine bottlenecks',
      'Unfocused window background framerate limiter'
    ],
    specs: [
      { label: 'Frametime Gain', value: '+18% - 32%' },
      { label: 'Particle Cap', value: 'Configurable' },
      { label: 'Target Refresh', value: '90 / 120 / 144 Hz' }
    ]
  },
  {
    id: 'anti-crash',
    number: '05',
    title: 'Anti-Crash Shield',
    subtitle: 'Proactive Malice Neutralizer',
    icon: ShieldAlert,
    description: 'Intercepts and drops corrupted polygon vertices, malicious shader loops, geometry shaders with explosive bounds, and audio burst attacks.',
    highlights: [
      'Geometry shader loop detection and instant blacklisting',
      'Vertex overflow protection (rejects >500k vertex packets)',
      'Ear-rape audio burst filter with hard decibel clamp',
      'Animation controller loop depth limiter (stops memory exhaustion)'
    ],
    specs: [
      { label: 'Interception Rate', value: '100% Known Exploits' },
      { label: 'Crash Prevention', value: 'Kernel / Unity Lvl' },
      { label: 'Shield Status', value: 'Always On' }
    ]
  },
  {
    id: 'stealth-config',
    number: '06',
    title: 'Stealth & Local Config',
    subtitle: 'Non-Intrusive Architecture',
    icon: Lock,
    description: 'Orbit leaves zero trace on your network. All calculations happen entirely on your GPU and CPU, with instantaneous JSON configuration hot-reloading.',
    highlights: [
      'Zero external server telemetry or tracking packets',
      'Pure JSON configuration file with instant runtime hot-reload',
      'Clean memory allocation without persistent hooks',
      'Customizable on-screen HUD positioning and opacity'
    ],
    specs: [
      { label: 'Config Type', value: 'Local JSON' },
      { label: 'Network Footprint', value: '0 Bytes Out' },
      { label: 'Memory Footprint', value: '14.2 MB RAM' }
    ]
  }
];

export const FeaturesGrid: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);

  return (
    <section id="features" className="relative border-b border-neutral-900 bg-black py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-900">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>CORE ARCHITECTURE</span>
              <span className="text-neutral-700">/</span>
              <span>SIX ESSENTIAL MODULES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-mono uppercase">
              Engineered Capabilities
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Built from scratch for peak framerate stability in VRChat. Every utility module runs asynchronously to prevent UI lag.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {features.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedFeature?.id === item.id;

            return (
              <div
                key={item.id}
                onClick={() => setSelectedFeature(isSelected ? null : item)}
                className={`group relative flex flex-col justify-between border bg-neutral-950 p-6 sm:p-7 transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'border-white shadow-[0_0_25px_rgba(255,255,255,0.12)]'
                    : 'border-neutral-800 hover:border-neutral-400 hover:shadow-[0_0_20px_rgba(255,255,255,0.06)]'
                }`}
              >
                {/* Tech corner accent */}
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neutral-600 group-hover:border-white transition-colors" />

                <div>
                  {/* Top card header */}
                  <div className="flex items-center justify-between pb-5 border-b border-neutral-900">
                    <span className="font-mono text-xs text-neutral-400 font-semibold tracking-wider">
                      MODULE {item.number}
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center border border-neutral-800 bg-black text-white group-hover:border-neutral-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="pt-5 space-y-1">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-neutral-400">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="pt-4 text-sm text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="pt-5 space-y-2.5">
                    {item.highlights.slice(0, 3).map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-400">
                        <Check className="w-3.5 h-3.5 text-white shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card footer with specs */}
                <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>{item.specs[0].label}: <strong className="text-white font-medium">{item.specs[0].value}</strong></span>
                  <div className="flex items-center gap-1 text-white group-hover:translate-x-1 transition-transform">
                    <span className="text-[11px] uppercase tracking-wider font-semibold">Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Module Deep-Dive Drawer */}
        {selectedFeature && (
          <div className="mt-8 border border-white bg-neutral-950 p-6 sm:p-8 animate-in fade-in duration-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
                  <span className="w-2 h-2 bg-white" />
                  <span>DEEP-DIVE SPECIFICATION // MODULE {selectedFeature.number}</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {selectedFeature.title} — {selectedFeature.subtitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="self-start lg:self-auto px-4 py-2 border border-neutral-700 text-xs font-mono text-neutral-300 hover:text-white hover:border-white transition-colors"
              >
                Close Inspector [ESC]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                  Operational Mechanics
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selectedFeature.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                  Full Feature Matrix
                </h4>
                <ul className="space-y-2">
                  {selectedFeature.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                      <div className="w-1.5 h-1.5 bg-white shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                  Engine Parameters
                </h4>
                <div className="space-y-2 border border-neutral-800 bg-black p-4 font-mono text-xs">
                  {selectedFeature.specs.map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-1 border-b border-neutral-900 last:border-none">
                      <span className="text-neutral-400">{s.label}</span>
                      <span className="text-white font-semibold">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
