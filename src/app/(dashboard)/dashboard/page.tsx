import { PrismaClient } from "@prisma/client";
import { ArrowUpRight, ArrowDownRight, Wallet, Activity, CreditCard, Landmark } from "lucide-react";
import { format } from "date-fns";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

// In a real app we'd get the authenticated user. For this portfolio, we just grab the first user.
async function getDashboardData() {
  const user = await prisma.user.findFirst({
    include: {
      accounts: {
        include: {
          transactions: {
            orderBy: { date: 'desc' },
            take: 5
          }
        }
      },
      healthScores: {
        orderBy: { date: 'asc' }
      }
    }
  });

  if (!user) return null;

  let totalCash = 0;
  let totalInvestments = 0;
  let totalCredit = 0;

  user.accounts.forEach(acc => {
    if (acc.type === 'bank') totalCash += acc.balance;
    if (acc.type === 'stock' || acc.type === 'mf' || acc.type === 'crypto' || acc.type === 'gold') totalInvestments += acc.balance;
    if (acc.type === 'credit_card' || acc.type === 'loan') totalCredit += acc.balance;
  });

  const netWorth = totalCash + totalInvestments + totalCredit;

  const allTransactions = user.accounts
    .flatMap(a => a.transactions)
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 8);

  return { user, netWorth, totalCash, totalInvestments, totalCredit, allTransactions, healthScore: user.healthScores[user.healthScores.length - 1] };
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
}

export default async function DashboardOverview() {
  const data = await getDashboardData();

  if (!data) {
    return <div className="p-8 text-center text-muted">No data found. Please run the seed script.</div>;
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Welcome back, {data.user.name.split(' ')[0]}</h1>
          <p className="text-muted mt-1">Here&apos;s your financial intelligence overview for today.</p>
        </div>
        <div className="hidden md:flex items-center gap-4 bg-elevated/50 p-4 rounded-2xl border border-white/5">
          <div className="text-right">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">Health Score</p>
            <p className="text-xl font-heading font-bold text-gold-start">{data.healthScore?.overallScore}/100</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-steel-start/20 relative flex items-center justify-center">
             <div className="absolute inset-0 border-4 border-gold-start rounded-full rounded-tr-transparent rotate-45" />
             <Activity className="w-5 h-5 text-gold-start" />
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl glass-effect shadow-[0_0_20px_rgba(212,175,55,0.05)] border-t border-t-gold-start/50">
          <div className="w-10 h-10 rounded-xl bg-gold-start/10 flex items-center justify-center mb-4">
            <Activity className="w-5 h-5 text-gold-start" />
          </div>
          <p className="text-sm font-medium text-muted mb-1">Total Net Worth</p>
          <h3 className="text-3xl font-heading font-bold text-foreground">{formatCurrency(data.netWorth)}</h3>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-400">
            <ArrowUpRight className="w-4 h-4" /> <span>+2.4% from last month</span>
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-effect">
          <div className="w-10 h-10 rounded-xl bg-steel-start/10 flex items-center justify-center mb-4">
            <Landmark className="w-5 h-5 text-steel-end" />
          </div>
          <p className="text-sm font-medium text-muted mb-1">Total Cash</p>
          <h3 className="text-3xl font-heading font-bold text-foreground">{formatCurrency(data.totalCash)}</h3>
        </div>

        <div className="p-6 rounded-3xl glass-effect">
          <div className="w-10 h-10 rounded-xl bg-accent-spark/10 flex items-center justify-center mb-4">
            <Wallet className="w-5 h-5 text-accent-spark" />
          </div>
          <p className="text-sm font-medium text-muted mb-1">Investments</p>
          <h3 className="text-3xl font-heading font-bold text-foreground">{formatCurrency(data.totalInvestments)}</h3>
        </div>

        <div className="p-6 rounded-3xl glass-effect">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4">
            <CreditCard className="w-5 h-5 text-rose-500" />
          </div>
          <p className="text-sm font-medium text-muted mb-1">Credit & Loans</p>
          <h3 className="text-3xl font-heading font-bold text-foreground">{formatCurrency(data.totalCredit)}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 p-8 rounded-3xl glass-effect">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading font-bold text-xl">Net Worth Trend</h3>
            <select className="bg-transparent border border-white/10 rounded-lg px-3 py-1.5 text-sm text-muted focus:outline-none focus:border-gold-start/50">
              <option>Last 6 Months</option>
              <option>1 Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-64 w-full flex items-end gap-2">
            {/* Simple CSS bars for demo since recharts needs client component wrapper */}
            {[40, 45, 50, 48, 60, 65].map((h, i) => (
              <div key={i} className="flex-1 bg-white/5 hover:bg-gold-start/20 transition-colors rounded-t-xl relative group">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gold-start/10 to-gold-start rounded-t-xl transition-all duration-1000 ease-out group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="p-8 rounded-3xl glass-effect">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-heading font-bold text-xl">Recent Activity</h3>
            <button className="text-sm font-medium text-gold-start hover:underline">View All</button>
          </div>
          
          <div className="space-y-6">
            {data.allTransactions.map(t => (
              <div key={t.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.type === 'credit' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                    {t.type === 'credit' ? <ArrowDownRight className="w-5 h-5 text-emerald-400" /> : <ArrowUpRight className="w-5 h-5 text-rose-400" />}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{t.merchant}</p>
                    <p className="text-xs text-muted mt-0.5">{t.category} • {format(t.date, 'MMM d')}</p>
                  </div>
                </div>
                <span className={`font-semibold ${t.type === 'credit' ? 'text-emerald-400' : 'text-foreground'}`}>
                  {t.type === 'credit' ? '+' : ''}{formatCurrency(t.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
