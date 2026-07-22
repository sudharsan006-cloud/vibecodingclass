"use client";

import { WealthGrowthSimulator } from "@/components/simulator/WealthGrowthSimulator";
import { ScrollReveal } from "@/components/effects/Parallax";
import { TiltCard } from "@/components/effects/TiltCard";
import { ScrollProgress } from "@/components/effects/ScrollProgress";

const modules = [
  {
    id: "01",
    title: "Unified Financial Dashboard",
    hook: "Your financial command center.",
    bullets: ["Income, Expenses, Savings", "Investments, Stocks, Mutual Funds", "Crypto, Gold, Credit Score", "Loans — updates in real time"],
  },
  {
    id: "02",
    title: "Market Intelligence",
    hook: "Stop opening five market apps.",
    bullets: ["Live Market Heatmaps", "Sector Performance", "Bull/Bear Sentiment", "Global Markets", "Economic Calendar", "News Impact Analysis"],
  },
  {
    id: "03",
    title: "Portfolio Analytics",
    hook: "Visual charts for every angle of a portfolio.",
    bullets: ["Asset Allocation", "Monthly Growth", "Annual Returns", "Profit Distribution", "Risk Distribution", "Expected Returns", "Tax Impact", "Diversification Score"],
  },
  {
    id: "04",
    title: "AI Financial Assistant",
    hook: "From numbers to meaning.",
    bullets: ["Contextual Spending Insights", "Concentration Risk Warnings", "Opportunity Detection", "Conversational Queries"],
  },
  {
    id: "05",
    title: "Expense Intelligence",
    hook: "See spending before it surprises you.",
    bullets: ["Daily/Weekly Spending", "Category Analysis", "Subscription Detection", "Expense Prediction", "Cash Flow Forecast"],
  },
  {
    id: "06",
    title: "Wealth Growth Simulator",
    hook: "What happens if…",
    bullets: ["Compound Growth Curves", "Inflation Impact", "Future Net Worth", "Adjustable Parameters"],
  },
  {
    id: "07",
    title: "Financial Health Score",
    hook: "One number for your whole financial life.",
    bullets: ["Savings Rate", "Emergency Fund", "Investment Diversity", "Debt Ratio", "Liquidity", "Net Worth", "Income Stability"],
  },
  {
    id: "08",
    title: "Smart Alerts",
    hook: "Know before it matters.",
    bullets: ["Portfolio Risk Increases", "Market Crash Begins", "Stock Hits Target", "Expense Exceeds Budget", "Bills Due", "Investment Opportunity"],
  },
];

/* ── Realistic inline UI Mockups ─────────────────────────────────────── */

function DashboardMockup() {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-1">
      {/* Top Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl bg-white/5 border border-white/5 p-4">
          <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Net Worth</p>
          <p className="text-lg font-heading font-bold text-gold-start">₹48.2L</p>
          <p className="text-[10px] text-emerald-400 mt-1">+12.4% ↑</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/5 p-4">
          <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Cash</p>
          <p className="text-lg font-heading font-bold text-foreground">₹3.8L</p>
          <p className="text-[10px] text-muted mt-1">3 accounts</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/5 p-4">
          <p className="text-[10px] uppercase tracking-wider text-muted mb-1">Investments</p>
          <p className="text-lg font-heading font-bold text-accent-spark">₹44.4L</p>
          <p className="text-[10px] text-emerald-400 mt-1">+8.7% ↑</p>
        </div>
      </div>
      {/* Mini Chart Area */}
      <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-foreground">Net Worth Trend</p>
          <div className="flex gap-2">
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-gold-start/20 text-gold-start">1Y</span>
            <span className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-muted">6M</span>
          </div>
        </div>
        <svg viewBox="0 0 300 80" className="w-full h-auto">
          <defs>
            <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(212,175,55)" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="rgb(212,175,55)" stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d="M0,60 C30,55 60,45 90,42 C120,39 150,50 180,35 C210,20 240,15 270,10 L300,8 L300,80 L0,80 Z" fill="url(#g1)"/>
          <path d="M0,60 C30,55 60,45 90,42 C120,39 150,50 180,35 C210,20 240,15 270,10 L300,8" fill="none" stroke="rgb(212,175,55)" strokeWidth="2"/>
        </svg>
      </div>
      {/* Activity Row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/5 border border-white/5 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Recent Activity</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between"><span className="text-[10px] text-foreground">Zerodha Buy</span><span className="text-[10px] text-red-400">-₹15,000</span></div>
            <div className="flex items-center justify-between"><span className="text-[10px] text-foreground">Salary Credit</span><span className="text-[10px] text-emerald-400">+₹85,000</span></div>
            <div className="flex items-center justify-between"><span className="text-[10px] text-foreground">Amazon</span><span className="text-[10px] text-red-400">-₹2,499</span></div>
          </div>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/5 p-3">
          <p className="text-[10px] uppercase tracking-wider text-muted mb-2">Credit Score</p>
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(74,78,87)" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(52,211,153)" strokeWidth="3" strokeDasharray="82 100" strokeLinecap="round"/>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-emerald-400">782</span>
            </div>
            <p className="text-[10px] text-emerald-400 font-medium">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketMockup() {
  const sectors = [
    { name: "IT", change: "+1.8%", color: "bg-emerald-500/80", w: "w-[72%]" },
    { name: "Banks", change: "+0.9%", color: "bg-emerald-500/60", w: "w-[58%]" },
    { name: "Pharma", change: "-0.4%", color: "bg-red-500/60", w: "w-[30%]" },
    { name: "Auto", change: "+2.1%", color: "bg-emerald-500/90", w: "w-[80%]" },
    { name: "Energy", change: "-1.2%", color: "bg-red-500/70", w: "w-[45%]" },
    { name: "FMCG", change: "+0.3%", color: "bg-emerald-500/40", w: "w-[40%]" },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-3 p-1">
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
          <p className="text-[9px] text-muted uppercase tracking-wider">Nifty 50</p>
          <p className="text-base font-heading font-bold text-emerald-400">24,835</p>
          <p className="text-[9px] text-emerald-400">+1.2%</p>
        </div>
        <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-3 text-center">
          <p className="text-[9px] text-muted uppercase tracking-wider">Sensex</p>
          <p className="text-base font-heading font-bold text-emerald-400">81,247</p>
          <p className="text-[9px] text-emerald-400">+0.9%</p>
        </div>
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-center">
          <p className="text-[9px] text-muted uppercase tracking-wider">Bank Nifty</p>
          <p className="text-base font-heading font-bold text-red-400">52,140</p>
          <p className="text-[9px] text-red-400">-0.3%</p>
        </div>
      </div>
      <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-4">
        <p className="text-xs font-medium text-foreground mb-3">Sector Performance</p>
        <div className="space-y-2.5">
          {sectors.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <span className="text-[10px] text-muted w-12 shrink-0">{s.name}</span>
              <div className="flex-1 h-3 rounded-full bg-white/5 overflow-hidden">
                <div className={`h-full rounded-full ${s.color} ${s.w} transition-all`}/>
              </div>
              <span className={`text-[10px] font-medium w-10 text-right ${s.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>{s.change}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-white/5 border border-white/5 p-3 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gold-start/20 flex items-center justify-center shrink-0">
          <span className="text-gold-start text-xs">📰</span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-foreground font-medium truncate">RBI keeps repo rate unchanged at 6.5%</p>
          <p className="text-[9px] text-muted">2 hours ago • Markets reacting positively</p>
        </div>
      </div>
    </div>
  );
}

function PortfolioMockup() {
  const assets = [
    { label: "Stocks", pct: 45, color: "rgb(212,175,55)" },
    { label: "MF", pct: 25, color: "rgb(59,130,246)" },
    { label: "Crypto", pct: 15, color: "rgb(168,85,247)" },
    { label: "Gold", pct: 10, color: "rgb(244,229,178)" },
    { label: "FD", pct: 5, color: "rgb(74,78,87)" },
  ];
  // Build a conic-gradient for the donut
  let cumulative = 0;
  const conicStops = assets.map((a) => {
    const start = cumulative;
    cumulative += a.pct;
    return `${a.color} ${start}% ${cumulative}%`;
  }).join(", ");

  return (
    <div className="w-full h-full flex flex-col gap-3 p-1">
      <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-4 flex items-center gap-6">
        {/* Donut */}
        <div className="relative w-36 h-36 shrink-0">
          <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${conicStops})` }}/>
          <div className="absolute inset-3 rounded-full bg-[#14161A] flex flex-col items-center justify-center">
            <span className="text-lg font-heading font-bold text-foreground">₹44.4L</span>
            <span className="text-[9px] text-emerald-400">+12.4%</span>
          </div>
        </div>
        {/* Legend */}
        <div className="space-y-2">
          {assets.map((a) => (
            <div key={a.label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: a.color }}/>
              <span className="text-[10px] text-muted w-10">{a.label}</span>
              <span className="text-[10px] text-foreground font-medium">{a.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-white/5 border border-white/5 p-3">
          <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Monthly Returns</p>
          <p className="text-base font-heading font-bold text-emerald-400">+₹38,420</p>
          <p className="text-[9px] text-muted mt-0.5">+3.2% this month</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/5 p-3">
          <p className="text-[10px] text-muted uppercase tracking-wider mb-1">Risk Score</p>
          <p className="text-base font-heading font-bold text-gold-start">Medium</p>
          <div className="flex gap-0.5 mt-1">
            {[1,2,3,4,5].map((i) => (
              <div key={i} className={`h-1 flex-1 rounded-full ${i <= 3 ? 'bg-gold-start' : 'bg-white/10'}`}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AIMockup() {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-1 justify-end">
      {/* Chat Bubble — user */}
      <div className="self-end max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-white/10 border border-white/5">
        <p className="text-[11px] text-foreground">Where am I spending the most this month?</p>
      </div>
      {/* Chat Bubble — AI */}
      <div className="self-start max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm bg-gradient-to-br from-gold-start/15 to-accent-spark/10 border border-gold-start/20">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-gold-start/30 flex items-center justify-center"><span className="text-[8px] text-gold-start">AI</span></div>
          <span className="text-[10px] text-gold-start font-medium">Finfix Intelligence</span>
        </div>
        <p className="text-[11px] text-foreground leading-relaxed mb-2">Your top 3 categories this month:</p>
        <div className="space-y-1.5 mb-2">
          <div className="flex items-center gap-2"><span className="text-[10px] text-foreground">🍽️ Dining</span><span className="text-[10px] text-red-400 ml-auto">₹12,400 (+34%)</span></div>
          <div className="flex items-center gap-2"><span className="text-[10px] text-foreground">🛒 Shopping</span><span className="text-[10px] text-muted ml-auto">₹8,200 (+5%)</span></div>
          <div className="flex items-center gap-2"><span className="text-[10px] text-foreground">🚗 Travel</span><span className="text-[10px] text-muted ml-auto">₹6,800 (-12%)</span></div>
        </div>
        <p className="text-[10px] text-muted">💡 <span className="text-gold-start">Dining is 34% above your 3-month average.</span> Consider setting a ₹10K monthly limit.</p>
      </div>
      {/* Input bar */}
      <div className="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 px-4 py-2.5">
        <span className="text-[11px] text-muted flex-1">Ask anything about your finances…</span>
        <div className="w-7 h-7 rounded-lg bg-gold-start/20 flex items-center justify-center shrink-0"><span className="text-gold-start text-xs">↑</span></div>
      </div>
    </div>
  );
}

function ExpenseMockup() {
  const categories = [
    { name: "Housing", amount: "₹25,000", pct: 35, color: "bg-gold-start" },
    { name: "Food", amount: "₹12,400", pct: 17, color: "bg-accent-spark" },
    { name: "Shopping", amount: "₹8,200", pct: 12, color: "bg-purple-500" },
    { name: "Transport", amount: "₹6,800", pct: 10, color: "bg-emerald-500" },
    { name: "Subscriptions", amount: "₹4,200", pct: 6, color: "bg-red-400" },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-3 p-1">
      <div className="rounded-xl bg-white/5 border border-white/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-medium text-foreground">July Spending</p>
          <span className="text-lg font-heading font-bold text-foreground">₹71,400</span>
        </div>
        {/* Stacked bar */}
        <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
          {categories.map((c) => (
            <div key={c.name} className={`${c.color} opacity-80 rounded-full`} style={{ width: `${c.pct}%` }}/>
          ))}
          <div className="bg-white/10 flex-1 rounded-full"/>
        </div>
      </div>
      <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-4">
        <p className="text-xs font-medium text-foreground mb-3">Category Breakdown</p>
        <div className="space-y-3">
          {categories.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${c.color} shrink-0`}/>
              <span className="text-[10px] text-muted flex-1">{c.name}</span>
              <span className="text-[10px] text-foreground font-medium">{c.amount}</span>
              <span className="text-[9px] text-muted w-8 text-right">{c.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 flex items-center gap-3">
        <span className="text-amber-400 text-sm">⚠️</span>
        <div>
          <p className="text-[10px] text-amber-400 font-medium">3 subscriptions detected</p>
          <p className="text-[9px] text-muted">Netflix, Spotify, Adobe — ₹1,847/mo total</p>
        </div>
      </div>
    </div>
  );
}

function HealthScoreMockup() {
  const metrics = [
    { name: "Savings Rate", score: 78, max: 100 },
    { name: "Emergency Fund", score: 5.2, max: 6, unit: "mo" },
    { name: "Investment Diversity", score: 82, max: 100 },
    { name: "Debt-to-Income", score: 18, max: 100, unit: "%" },
    { name: "Liquidity", score: 65, max: 100 },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-3 p-1">
      <div className="rounded-xl bg-white/5 border border-white/5 p-6 flex items-center justify-center">
        <div className="relative w-36 h-36">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(74,78,87)" strokeWidth="2.5"/>
            <circle cx="18" cy="18" r="15" fill="none" stroke="rgb(212,175,55)" strokeWidth="2.5" strokeDasharray="84 100" strokeLinecap="round"/>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-heading font-bold text-gold-start">84</span>
            <span className="text-[9px] text-muted uppercase tracking-wider">Health Score</span>
          </div>
        </div>
      </div>
      <div className="flex-1 rounded-xl bg-white/5 border border-white/5 p-4 space-y-3">
        {metrics.map((m) => (
          <div key={m.name}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-muted">{m.name}</span>
              <span className="text-[10px] text-foreground font-medium">{m.score}{m.unit || ''}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full bg-gold-start transition-all" style={{ width: `${(m.score / m.max) * 100}%` }}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlertsMockup() {
  const alerts = [
    { icon: "🔴", title: "Portfolio Risk Alert", desc: "Tech sector exposure at 42% — above your 30% threshold", time: "2m ago", color: "border-red-500/30 bg-red-500/5" },
    { icon: "📈", title: "Stock Target Hit", desc: "HDFC Bank crossed ₹1,720 — your sell target", time: "15m ago", color: "border-emerald-500/30 bg-emerald-500/5" },
    { icon: "⚡", title: "Spending Alert", desc: "Dining expenses already at 85% of monthly budget", time: "1h ago", color: "border-amber-500/30 bg-amber-500/5" },
    { icon: "💰", title: "SIP Due Tomorrow", desc: "ICICI Prudential Bluechip Fund — ₹10,000", time: "3h ago", color: "border-accent-spark/30 bg-accent-spark/5" },
    { icon: "🎯", title: "Investment Opportunity", desc: "Gold prices dropped 3.2% — potential buy zone", time: "5h ago", color: "border-gold-start/30 bg-gold-start/5" },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-2 p-1">
      <div className="flex items-center justify-between px-1 mb-1">
        <p className="text-xs font-medium text-foreground">Live Alerts</p>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 font-medium">5 new</span>
      </div>
      {alerts.map((a, i) => (
        <div key={i} className={`rounded-xl border ${a.color} p-3 flex items-start gap-3 transition-all hover:scale-[1.02]`}>
          <span className="text-sm mt-0.5">{a.icon}</span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-[11px] text-foreground font-medium">{a.title}</p>
              <span className="text-[8px] text-muted shrink-0 ml-2">{a.time}</span>
            </div>
            <p className="text-[10px] text-muted mt-0.5 leading-relaxed">{a.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const previewMap: Record<string, React.ReactNode> = {
  "01": <DashboardMockup />,
  "02": <MarketMockup />,
  "03": <PortfolioMockup />,
  "04": <AIMockup />,
  "05": <ExpenseMockup />,
  "07": <HealthScoreMockup />,
  "08": <AlertsMockup />,
};

export default function ProductsPage() {
  return (
    <div className="pt-32 pb-24 relative overflow-hidden">
      <ScrollProgress />
      <div className="max-w-7xl mx-auto px-6 mb-24 text-center">
        <ScrollReveal direction="up">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Financial Intelligence Ecosystem</h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">Eight deeply integrated modules designed to give you absolute clarity and control over your financial future.</p>
        </ScrollReveal>
      </div>

      <div className="space-y-32 relative z-10">
        {modules.map((mod, index) => {
          const isEven = index % 2 === 1;
          return (
            <section key={mod.id} id={mod.id} className="max-w-7xl mx-auto px-6 scroll-mt-32">
              <div className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
                
                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  <ScrollReveal direction={isEven ? "right" : "left"}>
                    <div className="flex items-center gap-4">
                      <span className="text-xl font-mono text-gold-start font-bold">{mod.id}</span>
                      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{mod.title}</h2>
                    </div>
                    <p className="text-xl text-steel-end font-medium border-l-2 border-gold-start pl-4 mt-6">{mod.hook}</p>
                    <ul className="space-y-3 pt-4">
                      {mod.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-spark shrink-0" />
                          <span className="text-muted">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollReveal>
                </div>

                {/* Preview Side */}
                <div className="flex-1 w-full perspective-[1200px]">
                  <ScrollReveal direction="depth" delay={0.2}>
                    {mod.id === "06" ? (
                      <div className="-mx-6 lg:mx-0">
                        <WealthGrowthSimulator />
                      </div>
                    ) : (
                      <TiltCard className="w-full aspect-[4/3] rounded-3xl glass-effect border border-white/5 p-4 relative overflow-hidden group hover:border-gold-start/20 transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-gold-start/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        <div className="relative z-10 w-full h-full pointer-events-none">
                          {previewMap[mod.id]}
                        </div>
                      </TiltCard>
                    )}
                  </ScrollReveal>
                </div>

              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
