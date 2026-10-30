import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "How do I open the Orbit menu in VR and Desktop modes?",
    answer: "In Desktop mode, press the [Insert] key on your keyboard. In VR mode (Oculus Touch, Valve Index Knuckles, or HTC Vive Wands), click the Right Thumbstick while opening the Quick Menu, or bind it to any custom gesture via orbit_config.json."
  },
  {
    question: "Do I need MelonLoader to run Orbit?",
    answer: "Yes, Orbit is compiled as an IL2CPP mod targeting MelonLoader v0.6.1 or newer. Simply install MelonLoader to your VRChat directory, then drop Orbit.dll and orbit_config.json directly into your Mods folder."
  },
  {
    question: "How does the Anti-Crash Shield protect against malicious avatars?",
    answer: "Orbit intercepts incoming mesh, shader, and animator packets before Unity can pass them to the GPU pipeline. If an avatar contains geometry shaders exceeding polygon thresholds, recursive animation depth traps, or audio bursts over 0 dB, Orbit automatically sanitizes the model and swaps it to a lightweight fallback."
  },
  {
    question: "Can I customize the hotkeys and overlay colors?",
    answer: "Absolutely. All keybindings and visual variables are saved in orbit_config.json. You can edit hotkeys, HUD opacity, wireframe thickness, and font sizes with any text editor. Changes reload instantly in-game without needing a restart."
  },
  {
    question: "Is there any telemetry or internet communication from Orbit?",
    answer: "No. Orbit operates with strict zero-telemetry architecture. The binary makes no outbound network connections and does not phone home to any servers. All calculations (ESP bounding boxes, distance math, audio clamping) execute entirely on your local CPU and GPU."
  }
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative border-b border-neutral-900 bg-black py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-900">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 bg-white" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
              <span className="text-neutral-700">/</span>
              <span>TECHNICAL KNOWLEDGEBASE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-mono uppercase">
              Frequently Asked
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-md">
            Common questions regarding MelonLoader compatibility, keybind configuration, and defensive crash handling.
          </p>
        </div>

        {/* Accordion */}
        <div className="mt-12 divide-y divide-neutral-900 border-t border-b border-neutral-900">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="transition-colors hover:bg-neutral-950/50">
                <button
                  onClick={() => toggleIndex(idx)}
                  className="w-full py-6 flex items-center justify-between text-left gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-semibold text-white tracking-tight">
                    {faq.question}
                  </span>
                  <div className="shrink-0 p-1 border border-neutral-800 bg-black text-white">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                {isOpen && (
                  <div className="pb-6 pr-12 text-sm text-neutral-400 leading-relaxed font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
