
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Users, 
  Target, 
  BarChart3, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  Zap, 
  ExternalLink,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  Share2,
  Globe,
  Cpu,
  Lock,
  ChevronRight,
  Database,
  Layout,
  CheckCircle2,
  Eye,
  Copy,
  Check,
  Search,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { analyzeProfile } from './services/geminiService';
import { AuditReport, LogEntry } from './types';

// Expanded bot metadata
const BOT_NAMES = [
  "alex_pro_99", "bot_master_v1", "social_ninja", "ghost_user", "crypto_king",
  "tech_guru", "fb_booster", "pulse_node_7", "alpha_user", "sigma_growth",
  "bot_vortex", "cyber_pixel", "nexus_flow", "shadow_pulse", "neo_growth",
  "kmer_growth", "phnom_penh_bot", "siem_reap_pulse", "khmer_elite", "angkor_tech",
  "digital_nomad", "traffic_gen_alpha", "meta_phantom", "social_spark"
];

const FOLLOWER_TARGETS = [
  '1000', '10000', '50000', '100000', '500000', '1000000', '5000000', '10000000'
];

interface BotEntry {
  id: string;
  name: string;
  country: string;
  avatar: string;
  timestamp: number;
}

const generateChartData = (current: number, target: number) => {
  const data = [];
  const steps = 15;
  const diff = target - current;
  for (let i = 0; i <= steps; i++) {
    data.push({
      name: `T+${i}`,
      followers: Math.floor(current + (diff / steps) * i * (Math.random() * 0.05 + 0.98)),
    });
  }
  return data;
};

const App: React.FC = () => {
  const [url, setUrl] = useState('https://www.facebook.com/share/1D5pXwVGL8/');
  const [targetAmount, setTargetAmount] = useState('1000000');
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentFollowers, setCurrentFollowers] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [audit, setAudit] = useState<AuditReport | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [botFeed, setBotFeed] = useState<BotEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'matrix' | 'page'>('page');
  const [isCopied, setIsCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const logEndRef = useRef<HTMLDivElement>(null);
  const botFeedEndRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    setLogs(prev => [...prev.slice(-30), {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    }]);
  }, []);

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    if (botFeedEndRef.current) botFeedEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [logs, botFeed]);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      addLog("Target URL copied to system buffer.", "success");
    });
  };

  const handleRefreshChart = () => {
    if (chartData.length === 0) return;
    setIsRefreshing(true);
    addLog("Updating trajectory matrix...", "info");
    setTimeout(() => {
      const target = parseInt(targetAmount);
      const start = audit ? audit.currentFollowers : currentFollowers;
      setChartData(generateChartData(start, target));
      setIsRefreshing(false);
      addLog("Matrix sync complete.", "success");
    }, 400);
  };

  const handleOpenExternal = () => {
    window.open(url, '_blank');
    addLog("Direct verification link opened in new instance.", "info");
  };

  const handleStartPulse = async () => {
    if (!url) {
      setError("Injection source required.");
      return;
    }
    
    setError(null);
    setIsSimulating(true);
    setProgress(0);
    setLogs([]);
    setBotFeed([]);
    
    addLog(`BOOTING HYPER-PULSE V5 [STEALTH_MODE]`, 'warning');
    addLog(`SYNCING WITH TARGET: ${url}`, 'info');

    try {
      addLog("PROBING TARGET METADATA...", 'info');
      const auditResult = await analyzeProfile(url, targetAmount);
      setAudit(auditResult);
      setCurrentFollowers(auditResult.currentFollowers);
      setChartData(generateChartData(auditResult.currentFollowers, parseInt(targetAmount)));
      addLog("SYNC ESTABLISHED. BYPASSING ANTI-SPAM GUARD...", 'success');

      const target = parseInt(targetAmount);
      const start = auditResult.currentFollowers;
      
      const fastPhases = [
        "SPOOFING IP_GEO...",
        "DECRYPTING CACHE...",
        "INJECTING TOKENS...",
        "MASS_BOOT_SEQ...",
        "SIGNAL_BROADCAST..."
      ];

      for (let i = 0; i < fastPhases.length; i++) {
        addLog(fastPhases[i], 'info');
        await new Promise(r => setTimeout(r, 300));
        setProgress(Math.floor(((i + 1) / fastPhases.length) * 30));
      }

      addLog("INJECTION ACTIVE - HIGH_SPEED_MODE", 'warning');
      
      const injectionDuration = 4000; // Faster duration
      const injectionStartTime = performance.now();
      
      const botInterval = setInterval(() => {
        const randomBotName = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
        const botId = Math.random().toString(36).substring(7);
        const name = `${randomBotName}_${botId}`;
        const countries = ['KH', 'US', 'VN', 'TH', 'RU', 'BR', 'CH', 'ID', 'IN'];
        const country = countries[Math.floor(Math.random() * countries.length)];
        
        setBotFeed(prev => [...prev.slice(-20), {
          id: botId,
          name,
          country,
          avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${name}`,
          timestamp: Date.now()
        }]);
      }, 80); // Even faster bot updates

      const animatePulse = (currentTime: number) => {
        const elapsed = currentTime - injectionStartTime;
        const p = Math.min(elapsed / injectionDuration, 1);
        const ease = 1 - Math.pow(1 - p, 2); 
        
        const count = Math.floor(start + (target - start) * ease);
        setCurrentFollowers(count);
        setProgress(Math.floor(30 + (p * 70)));

        if (p < 1) {
          requestAnimationFrame(animatePulse);
        } else {
          clearInterval(botInterval);
          addLog(`PROTOCOL COMPLETE. VIRTUAL REACH: ${target.toLocaleString()}`, 'success');
          setIsSimulating(false);
        }
      };

      requestAnimationFrame(animatePulse);

    } catch (err) {
      addLog("CONNECTION INTERRUPTED", 'error');
      setError("AI Core failed to respond. Try again.");
      setIsSimulating(false);
    }
  };

  const formatFollowers = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-cyan-50 flex flex-col selection:bg-cyan-500/30 font-sans">
      {/* HUD Header */}
      <header className="h-16 border-b border-cyan-500/10 bg-black/80 backdrop-blur-xl flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <span className="font-black tracking-tighter text-2xl uppercase italic text-white">
              Pulse<span className="text-cyan-500">.Matrix</span>
            </span>
          </div>
          <div className="h-6 w-[1px] bg-cyan-900/50"></div>
          <div className="flex items-center gap-3 px-4 py-1.5 bg-cyan-500/5 border border-cyan-500/10 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
            <span className="text-[11px] font-mono text-cyan-500 font-bold uppercase tracking-[2px]">Stream_Active</span>
          </div>
        </div>
        
        <div className="hidden xl:flex items-center gap-8">
          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-cyan-800 font-bold uppercase tracking-widest">Bot_Nodes</span>
            <span className="text-xs font-mono text-cyan-400 font-bold">14,292_ACTIVE</span>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
            SIMULATION_MODE_V5
          </div>
        </div>
      </header>

      <main className="flex-1 p-8 max-w-[1900px] mx-auto w-full grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Sidebar: Injection Console */}
        <section className="xl:col-span-3 flex flex-col gap-8">
          <div className="bg-black/40 border border-cyan-500/10 rounded-xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Database className="w-20 h-20 text-cyan-400" />
            </div>
            
            <div className="flex items-center gap-3 mb-8 border-b border-cyan-500/10 pb-6">
              <Zap className="w-5 h-5 text-cyan-500" />
              <h2 className="text-xs font-mono font-black uppercase tracking-[4px] text-cyan-400">INJECTION_CMD</h2>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black text-cyan-800 tracking-widest block">TARGET_URI</label>
                <div className="relative flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full bg-black/60 border border-cyan-500/20 rounded-lg pl-4 pr-10 py-4 focus:outline-none focus:border-cyan-400 transition-all text-xs font-mono text-cyan-100"
                    />
                    <ExternalLink className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-900" />
                  </div>
                  <button 
                    onClick={handleCopyUrl}
                    className={`p-4 rounded-lg border transition-all flex items-center justify-center ${isCopied ? 'bg-green-500/20 border-green-500/50 text-green-400' : 'bg-cyan-500/5 border-cyan-500/20 text-cyan-700'}`}
                  >
                    {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] uppercase font-black text-cyan-800 tracking-widest block">PAYLOAD_VOLUME</label>
                <div className="grid grid-cols-2 gap-2">
                  {FOLLOWER_TARGETS.map(val => (
                    <button
                      key={val}
                      onClick={() => setTargetAmount(val)}
                      className={`px-3 py-2 rounded text-[10px] font-mono transition-all border ${
                        targetAmount === val 
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 font-black' 
                        : 'bg-black/40 border-cyan-900/30 text-cyan-900'
                      }`}
                    >
                      {formatFollowers(parseInt(val))}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={handleStartPulse}
                disabled={isSimulating}
                className={`w-full py-5 rounded-lg font-black text-xs uppercase tracking-[5px] transition-all relative overflow-hidden group shadow-2xl ${
                  isSimulating 
                  ? 'bg-slate-900 text-slate-700 cursor-not-allowed' 
                  : 'bg-cyan-600 hover:bg-cyan-500 text-black'
                }`}
              >
                {isSimulating ? "SYNCING..." : "IGNITE_PULSE"}
              </button>
            </div>
          </div>

          <div className="bg-black/60 border border-cyan-500/10 rounded-xl flex-1 flex flex-col overflow-hidden shadow-2xl">
            <div className="bg-cyan-500/5 px-6 py-3 border-b border-cyan-500/10 flex items-center justify-between">
              <span className="text-[10px] font-black text-cyan-700 uppercase tracking-widest">Sys_Log</span>
              <Terminal className="w-4 h-4 text-cyan-700" />
            </div>
            <div className="p-6 flex-1 font-mono text-[10px] overflow-y-auto bg-black/40 text-cyan-400">
              {logs.map((log) => (
                <div key={log.id} className="mb-2">
                  <span className="text-cyan-950">[{log.timestamp}]</span> {log.message}
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>
        </section>

        {/* Dashboard Area */}
        <section className="xl:col-span-9 flex flex-col gap-8">
          {/* Dashboard Header Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-black/40 border border-cyan-500/10 p-6 rounded-xl flex flex-col relative overflow-hidden">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-cyan-600" />
                <span className="text-[9px] font-bold text-green-500">REALTIME</span>
              </div>
              <div className="text-4xl font-black text-white tabular-nums tracking-tighter">
                {currentFollowers.toLocaleString()}
              </div>
              <div className="text-[10px] font-mono text-cyan-900 uppercase font-black">Internal_Followers</div>
            </div>

            <div className="bg-black/40 border border-cyan-500/10 p-6 rounded-xl flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
                <span className="text-[9px] font-bold text-cyan-600">AUDITED</span>
              </div>
              <div className="text-4xl font-black text-white tracking-tighter">
                {audit?.engagementRate || '0.0%'}
              </div>
              <div className="text-[10px] font-mono text-cyan-900 uppercase font-black">Sync_Rate</div>
            </div>

            <div className="bg-black/40 border border-cyan-500/10 p-6 rounded-xl flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <Globe className="w-5 h-5 text-cyan-500" />
                <span className="text-[9px] font-bold text-cyan-600">DETECTED</span>
              </div>
              <div className="text-2xl font-black text-white uppercase truncate">
                {audit?.niche || 'SCANNING...'}
              </div>
              <div className="text-[10px] font-mono text-cyan-900 uppercase font-black">Target_Niche</div>
            </div>

            <div className="bg-black/40 border border-cyan-500/10 p-6 rounded-xl flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <Lock className="w-5 h-5 text-cyan-500" />
                <span className="text-[9px] font-bold text-cyan-600">STABLE</span>
              </div>
              <div className="text-3xl font-black text-white">
                {audit?.riskFactor || 'READY'}
              </div>
              <div className="text-[10px] font-mono text-cyan-900 uppercase font-black">Safety_Layer</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
            {/* Viewport Area */}
            <div className="lg:col-span-8 bg-black/40 border border-cyan-500/10 rounded-xl flex flex-col shadow-2xl relative overflow-hidden min-h-[500px]">
              <div className="flex items-center justify-between px-8 py-4 border-b border-cyan-500/10 relative z-10 bg-black/20">
                <div className="flex gap-4">
                  <button onClick={() => setViewMode('page')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'page' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-cyan-900'}`}>PAGE_LIVE</button>
                  <button onClick={() => setViewMode('matrix')} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${viewMode === 'matrix' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-cyan-900'}`}>TRAJECTORY</button>
                </div>
                <div className="flex items-center gap-4">
                  <button onClick={handleOpenExternal} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded border border-white/10 text-[10px] font-bold hover:bg-white/10 transition-all uppercase tracking-widest">
                    <ExternalLink className="w-3 h-3" /> Verify_FB
                  </button>
                </div>
              </div>
              
              <div className="flex-1 relative z-10 p-8">
                {viewMode === 'page' ? (
                  <div className="h-full flex flex-col animate-in fade-in duration-500">
                    <div className="bg-[#18191a] rounded-t-xl border border-white/5 overflow-hidden">
                      {/* Fake FB Banner */}
                      <div className="h-32 bg-gradient-to-r from-blue-900 to-cyan-900 relative">
                        <div className="absolute inset-0 bg-black/20"></div>
                        <div className="absolute -bottom-12 left-8 w-24 h-24 rounded-full border-4 border-[#18191a] bg-[#242526] flex items-center justify-center overflow-hidden">
                           <Users className="w-12 h-12 text-white/10" />
                           {isSimulating && <div className="absolute inset-0 bg-cyan-500/20 animate-pulse"></div>}
                        </div>
                      </div>
                      <div className="pt-14 pb-6 px-8 flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-2xl font-bold text-white tracking-tight">Virtual_Target_Mirror</h4>
                            <CheckCircle2 className="w-5 h-5 text-[#1877f2] fill-white" />
                          </div>
                          <div className="text-xs font-mono text-cyan-900 mb-4 truncate max-w-xs">{url}</div>
                          <div className="flex items-center gap-4 text-sm font-bold text-white">
                            <span>{formatFollowers(currentFollowers)} <span className="font-normal text-slate-500">followers</span></span>
                            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                            <span>2,492 following</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                           <button className="bg-[#1877f2] hover:bg-[#166fe5] text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all">
                             <Check className="w-4 h-4" /> Following
                           </button>
                           <button className="bg-[#3a3b3c] hover:bg-[#4e4f50] text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
                             Message
                           </button>
                           <button className="bg-[#3a3b3c] px-3 py-2 rounded-lg"><MoreHorizontal className="w-5 h-5" /></button>
                        </div>
                      </div>
                    </div>
                    {/* Fake FB Feed Placeholder */}
                    <div className="mt-6 flex-1 bg-[#242526] rounded-xl border border-white/5 p-6 flex flex-col gap-6">
                      <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex gap-6">
                           <span className="text-[#1877f2] font-bold border-b-2 border-[#1877f2] pb-4">Posts</span>
                           <span className="text-slate-400 font-bold">About</span>
                           <span className="text-slate-400 font-bold">Followers</span>
                           <span className="text-slate-400 font-bold">Photos</span>
                        </div>
                        <Search className="w-5 h-5 text-slate-400" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                        <div className="bg-[#18191a] rounded-lg p-4 border border-white/5">
                           <div className="flex items-center gap-3 mb-4">
                             <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse"></div>
                             <div className="flex-1 space-y-2">
                               <div className="h-3 w-1/3 bg-slate-800 rounded animate-pulse"></div>
                               <div className="h-2 w-1/4 bg-slate-800/50 rounded animate-pulse"></div>
                             </div>
                           </div>
                           <div className="space-y-3 mb-6">
                             <div className="h-3 w-full bg-slate-800 rounded animate-pulse"></div>
                             <div className="h-3 w-4/5 bg-slate-800 rounded animate-pulse"></div>
                           </div>
                           <div className="flex justify-between border-t border-white/5 pt-3">
                              <ThumbsUp className="w-4 h-4 text-slate-600" />
                              <MessageCircle className="w-4 h-4 text-slate-600" />
                              <Share className="w-4 h-4 text-slate-600" />
                           </div>
                        </div>
                        <div className="bg-[#18191a] rounded-lg p-4 border border-white/5 hidden md:block">
                           <div className="flex items-center gap-3 mb-4">
                             <div className="w-10 h-10 rounded-full bg-slate-800 animate-pulse"></div>
                             <div className="flex-1 space-y-2">
                               <div className="h-3 w-1/3 bg-slate-800 rounded animate-pulse"></div>
                               <div className="h-2 w-1/4 bg-slate-800/50 rounded animate-pulse"></div>
                             </div>
                           </div>
                           <div className="space-y-3 mb-6">
                             <div className="h-3 w-full bg-slate-800 rounded animate-pulse"></div>
                             <div className="h-3 w-4/5 bg-slate-800 rounded animate-pulse"></div>
                           </div>
                           <div className="flex justify-between border-t border-white/5 pt-3">
                              <ThumbsUp className="w-4 h-4 text-slate-600" />
                              <MessageCircle className="w-4 h-4 text-slate-600" />
                              <Share className="w-4 h-4 text-slate-600" />
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col">
                    <div className="flex justify-end mb-6">
                       <button onClick={handleRefreshChart} className={`p-2 rounded border transition-all ${isRefreshing ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' : 'bg-black/20 border-cyan-900/50 text-cyan-700'}`}>
                         <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                       </button>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData.length > 0 ? chartData : Array(15).fill({name: '', followers: 0})}>
                        <defs>
                          <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(6,182,212,0.05)" />
                        <XAxis dataKey="name" stroke="#083344" fontSize={10} tickLine={false} axisLine={false} dy={10} fontStyle="bold" />
                        <YAxis stroke="#083344" fontSize={10} tickLine={false} axisLine={false} fontStyle="bold" tickFormatter={(v) => formatFollowers(v)} />
                        <Tooltip contentStyle={{ backgroundColor: '#000', border: '1px solid #083344', color: '#06b6d4', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace' }} />
                        <Area type="monotone" dataKey="followers" stroke="#06b6d4" strokeWidth={4} fillOpacity={1} fill="url(#colorFollowers)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </div>

            {/* Live Feed Stream */}
            <div className="lg:col-span-4 bg-black/40 border border-cyan-500/10 rounded-xl flex flex-col overflow-hidden shadow-2xl">
              <div className="bg-cyan-500/5 px-6 py-4 border-b border-cyan-500/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-cyan-500" />
                  <h3 className="text-[11px] font-black uppercase tracking-[3px] text-cyan-400">MASS_INJECTION_FEED</h3>
                </div>
                <div className="text-[9px] font-mono text-cyan-900 font-black italic">IPS: {isSimulating ? '28.4' : '0.0'}</div>
              </div>
              <div className="flex-1 p-4 font-mono text-[10px] overflow-y-auto space-y-2 bg-black/20">
                {botFeed.length === 0 && <div className="text-cyan-950 italic text-center py-20 uppercase font-black opacity-30 tracking-[4px]">Awaiting_Signal</div>}
                {botFeed.map((bot) => (
                  <div key={bot.id} className="flex items-center justify-between p-2 bg-cyan-500/5 border border-cyan-500/5 rounded animate-in fade-in slide-in-from-right-4">
                    <div className="flex items-center gap-2">
                      <img src={bot.avatar} alt="avatar" className="w-7 h-7 rounded border border-cyan-500/20 bg-black/50" />
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-[10px] tracking-tight truncate max-w-[100px]">{bot.name}</span>
                        <span className="text-[8px] text-cyan-900">NODE: {bot.country}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="px-1.5 py-0.5 bg-green-500/10 rounded text-[7px] font-black text-green-500 border border-green-500/20 uppercase">Synced</div>
                    </div>
                  </div>
                ))}
                <div ref={botFeedEndRef} />
              </div>
              <div className="p-4 bg-cyan-950/20 text-[10px] text-cyan-700 font-mono text-center border-t border-cyan-500/10">
                BOT_POOL: {isSimulating ? '1.4M_READY' : '0_STANDBY'}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Visual Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
      
      <footer className="h-12 border-t border-cyan-500/10 bg-black/60 px-8 flex items-center justify-between text-[10px] font-mono text-cyan-900 font-black uppercase tracking-[0.4em]">
        <span>PULSE_MATRIX_ENGINE_V5.0</span>
        <span>VERIFIED_BY_GEMINI_AI</span>
        <span>BUILD_STATUS: ELITE_STABLE</span>
      </footer>
    </div>
  );
};

export default App;
