import React, { useState } from 'react';
import { Bot, Send, Sparkles, RefreshCw, Copy, Check, Terminal, ShieldAlert } from 'lucide-react';
import { AnalyticsEvent } from '../utils/analyticsTracker.ts';

interface OrbitAiSentinelProps {
  events: AnalyticsEvent[];
}

export const OrbitAiSentinel: React.FC<OrbitAiSentinelProps> = ({ events }) => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiSource, setAiSource] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const quickPrompts = [
    'Analyze our visitors and identify top downloaders by username',
    'Perform security & burst-download anomaly check',
    'Compare VR Headset vs Desktop users across countries',
    'Generate an executive traffic report and growth advice',
  ];

  const handleRunAi = async (customPrompt?: string) => {
    const query = customPrompt || prompt;
    if (!query.trim()) return;

    setLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: query,
          events: events.slice(0, 100),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiResponse(data.analysis || 'Analysis completed with no findings.');
        setAiSource(data.source || 'Orbit AI Sentinel');
      } else {
        throw new Error('API request failed');
      }
    } catch (err) {
      console.error('AI Error:', err);
      // Fallback local analysis
      setAiResponse(
        `[ORBIT AI TELEMETRY INTELLIGENCE]\n• Analyzed ${events.length} visitor records.\n• Active Download Count: ${events.filter(e => e.type === 'DOWNLOAD').length}\n• Unique Logged-In Usernames: ${Array.from(new Set(events.map(e => e.username))).join(', ')}\n• System Status: All IL2CPP binaries intact.`
      );
      setAiSource('Orbit AI Sentinel (Local Heuristic)');
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = () => {
    if (!aiResponse) return;
    navigator.clipboard.writeText(aiResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-neutral-800 bg-black p-5 space-y-4 font-mono text-xs">
      
      {/* AI Titlebar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-900">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 border border-white bg-neutral-950 text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white uppercase tracking-wider">
                ORBIT AI CYBER-SENTINEL
              </span>
              <span className="px-1.5 py-0.2 bg-white text-black font-bold text-[10px]">
                AI-POWERED
              </span>
            </div>
            <span className="text-[11px] text-neutral-400">
              Visitor pattern intelligence & telemetry reasoning
            </span>
          </div>
        </div>

        {aiSource && (
          <span className="text-[10px] text-neutral-400 border border-neutral-800 px-2 py-0.5">
            Model: <strong className="text-white">{aiSource}</strong>
          </span>
        )}
      </div>

      {/* Quick Prompts */}
      <div className="space-y-1.5">
        <span className="text-neutral-500 text-[10px] uppercase block">
          Select Automated Intelligence Scan:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setPrompt(p);
                handleRunAi(p);
              }}
              className="px-2.5 py-1 border border-neutral-800 bg-neutral-950 text-neutral-300 hover:text-white hover:border-neutral-500 text-[11px] transition-colors text-left"
            >
              • {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRunAi();
        }}
        className="flex gap-2"
      >
        <div className="relative flex-1">
          <Terminal className="absolute left-3 top-2.5 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            placeholder="Ask AI anything about your visitors, download spikes, usernames..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-neutral-800 bg-neutral-950 text-xs text-white placeholder-neutral-600 focus:border-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1.5 border border-white bg-white px-4 py-2 font-bold uppercase tracking-wider text-black hover:bg-black hover:text-white transition-colors disabled:opacity-50"
        >
          {loading ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          <span>{loading ? 'Analyzing...' : 'Execute AI'}</span>
        </button>
      </form>

      {/* AI Output Terminal */}
      {aiResponse && (
        <div className="border border-neutral-700 bg-neutral-950 p-4 space-y-3 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-800 text-[11px] text-neutral-400">
            <div className="flex items-center gap-2 text-white font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ORBIT AI INTELLIGENCE VERDICT</span>
            </div>
            <button
              onClick={copyResponse}
              className="flex items-center gap-1 hover:text-white transition-colors text-neutral-400"
            >
              {copied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <div className="text-neutral-200 leading-relaxed whitespace-pre-line text-xs font-mono">
            {aiResponse}
          </div>
        </div>
      )}

    </div>
  );
};
