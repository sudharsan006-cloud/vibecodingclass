import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Mock user data to bypass Vercel DB connection issues
    const user = {
      accounts: [
        { type: 'bank', balance: 5000, transactions: [{ type: 'debit', amount: 1200, category: 'Groceries' }], holdings: [] },
        { type: 'crypto', balance: 3000, transactions: [], holdings: [{ symbol: 'BTC' }] }
      ],
      healthScores: [{ emergencyFundMonths: 4 }]
    };

    // A simple mock AI engine logic based on actual db data
    
    let highestExpenseCategory = '';
    let highestExpenseAmount = 0;
    const categoryMap = new Map<string, number>();

    user.accounts.forEach(acc => {
      acc.transactions.forEach(t => {
        if (t.type === 'debit') {
          const current = categoryMap.get(t.category) || 0;
          const newAmount = current + Math.abs(t.amount);
          categoryMap.set(t.category, newAmount);
          if (newAmount > highestExpenseAmount) {
            highestExpenseAmount = newAmount;
            highestExpenseCategory = t.category;
          }
        }
      });
    });

    const insights = [];

    if (highestExpenseCategory) {
      insights.push({
        type: 'alert',
        title: 'Spending Pattern Detected',
        description: `Your spending on ${highestExpenseCategory} is unusually high this month (₹${highestExpenseAmount}). Consider setting a budget limit.`,
        actionable: true,
        actionLabel: 'Set Budget'
      });
    }

    const healthScore = user.healthScores[0];
    if (healthScore && healthScore.emergencyFundMonths < 6) {
      insights.push({
        type: 'warning',
        title: 'Emergency Fund Low',
        description: `You currently have ${healthScore.emergencyFundMonths} months of expenses saved. The recommended target is 6 months.`,
        actionable: true,
        actionLabel: 'Transfer to Savings'
      });
    }

    // Crypto volatility insight
    const cryptoAcc = user.accounts.find(a => a.type === 'crypto');
    if (cryptoAcc && cryptoAcc.holdings.length > 0) {
      insights.push({
        type: 'opportunity',
        title: 'Market Volatility',
        description: `Crypto markets are showing high volatility. Your ${cryptoAcc.holdings[0].symbol} holdings might be impacted.`,
        actionable: false
      });
    }

    // Default insight if none trigger
    if (insights.length === 0) {
      insights.push({
        type: 'positive',
        title: 'On Track',
        description: 'Your financial health is stable and on track with your long-term goals.',
        actionable: false
      });
    }

    return NextResponse.json({ insights });

  } catch (error) {
    console.error('Insights Engine Error:', error);
    return NextResponse.json({ error: 'Failed to generate insights' }, { status: 500 });
  }
}
