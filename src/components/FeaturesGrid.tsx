import React, { useState } from 'react';
import { 
  Wind,
  Flame,
  Swords,
  Fingerprint,
  Scan,
  ShieldAlert,
  Check, 
  ChevronRight
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
    id: 'fly-movement',
    number: '01',
    title: 'Fly & Speed Hacks',
    subtitle: 'Directional Physics Gliding',
    icon: Wind,
    description: 'Smooth full-axis flight with 1x to 10x speed multipliers, vertical elevation binds, wall-phasing NoClip, and infinite air jumps.',
    highlights: [
      'Smooth directional 3D flight with zero gravity deceleration',
      'Ground sprint speedhack multiplier (1.0x to 5.0x velocity)',
      'NoClip geometry bypass to phase through closed world barriers',
      'Infinite air-jump resets for unbounded vertical scaling'
    ],
    specs: [
      { label: 'Max Flight Speed', value: '10.0x Velocity' },
      { label: 'Hot-Swap Key', value: '[F] / [Space + C]' },
      { label: 'Collision State', value: 'NoClip Optional' }
    ]
  },
  {
    id: 'among-us',
    number: '02',
    title: 'Among Us World Hacks',
    subtitle: 'Role & Sabotage Manipulation',
    icon: Flame,
    description: 'Dedicated exploit suite for VRChat Among Us worlds. Force impostor role on self, make all players impostors, trigger instant Kill All, and reveal active killers.',
    highlights: [
      'Force Impostor on self with instant sabotage and vent access',
      'Make All Impostors global synchronized role override',
      'Instant Kill All routine with map-wide reach bypass',
      'Emergency discussion timer skip and auto-complete tasks'
    ],
    specs: [
      { label: 'World Target', value: 'VRC Among Us' },
      { label: 'Kill Radius', value: 'Infinite Reach' },
      { label: 'Detection Rate', value: '0% (Local Hook)' }
    ]
  },
  {
    id: 'vrc-boxing',
    number: '03',
    title: 'VRC Boxing Utilities',
    subtitle: 'Hitbox & Critical Strike Multipliers',
    icon: Swords,
    description: 'Dominate combat and boxing instances. Expand your fist hitboxes to double radius, lock instant 100% critical damage, and freeze stamina depletion.',
    highlights: [
      'Double Hitbox expansion (reach multiplier up to 4.0x)',
      '100% Instant Critical hits dealing maximum damage',
      'Infinite Guard & Stamina lock to prevent fatigue slowdown',
      'Auto-Dodge reaction hook for slipping incoming punches'
    ],
    specs: [
      { label: 'Hitbox Scale', value: '2.5x Double Bounds' },
      { label: 'Crit Multiplier', value: '3.0x Damage' },
      { label: 'Guard Lock', value: 'Infinite Stamina' }
    ]
  },
  {
    id: 'author-spoof',
    number: '04',
    title: 'Author & Platform Spoof',
    subtitle: 'Identity & Signature Faker',
    icon: Fingerprint,
    description: 'Bypass creator locks and blacklist triggers. Spoof your avatar author tag to any custom creator name, scramble your HWID, and fake Quest/PC platform packets.',
    highlights: [
      'Author ID / Creator name spoofer for locked world assets',
      'Platform identity spoofing (toggle Quest 3 vs Desktop SteamVR)',
      'Dynamic HWID & MAC address scrambler on game launch',
      'Staff and VRChat moderator proximity radar alerts'
    ],
    specs: [
      { label: 'Custom Author', value: 'User Configurable' },
      { label: 'Platform Packet', value: 'Quest / Desktop' },
      { label: 'Staff Sentinel', value: 'Proximity Warning' }
    ]
  },
  {
    id: 'visual-esp',
    number: '05',
    title: 'Visual ESP & Wireframe',
    subtitle: 'Occlusion-Tested Direct3D Stencil',
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
    id: 'anti-crash',
    number: '06',
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
              <span>WORLD HACKS, MOVEMENT & STEALTH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-mono uppercase">
              Engineered Capabilities
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Built from scratch for peak performance in VRChat. From full-axis flight and Among Us/Boxing world hacks to author spoofing and anti-crash protection.
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
          <div className="mt-8 border border-white bg-neutral-950 p-6 sm:p-8 animate-in fade-in duration-200 font-mono text-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="w-2 h-2 bg-white" />
                  <span>DEEP-DIVE SPECIFICATION // MODULE {selectedFeature.number}</span>
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">
                  {selectedFeature.title} — {selectedFeature.subtitle}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFeature(null)}
                className="self-start lg:self-auto px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white hover:border-white transition-colors"
              >
                Close Inspector [ESC]
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="space-y-3">
                <h4 className="uppercase text-neutral-400 tracking-wider">
                  Operational Mechanics
                </h4>
                <p className="text-neutral-300 leading-relaxed font-sans text-sm">
                  {selectedFeature.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="uppercase text-neutral-400 tracking-wider">
                  Full Feature Matrix
                </h4>
                <ul className="space-y-2">
                  {selectedFeature.highlights.map((h, i) => (
                    <li key={i} className="flex items-center gap-2 text-neutral-300">
                      <div className="w-1.5 h-1.5 bg-white shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="uppercase text-neutral-400 tracking-wider">
                  Engine Parameters
                </h4>
                <div className="space-y-2 border border-neutral-800 bg-black p-4">
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
