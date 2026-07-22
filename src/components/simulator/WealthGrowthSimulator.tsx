"use client";

import { useState, useMemo } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export function WealthGrowthSimulator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [years, setYears] = useState(10);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);

  const data = useMemo(() => {
    const result = [];
    const r = expectedReturn / 12 / 100;
    const rInflation = (expectedReturn - inflationRate) / 12 / 100;

    for (let year = 1; year <= years; year++) {
      const n = year * 12;
      
      const fvNominal = monthlyInvestment * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      // Approximation for inflation adjusted value using real return rate
      const fvAdjusted = monthlyInvestment * ((Math.pow(1 + rInflation, n) - 1) / rInflation) * (1 + rInflation);

      result.push({
        year: `Year ${year}`,
        nominal: Math.round(fvNominal),
        adjusted: Math.round(fvAdjusted),
      });
    }
    return result;
  }, [monthlyInvestment, years, expectedReturn, inflationRate]);

  const finalNominal = data.length > 0 ? data[data.length - 1].nominal : 0;
  const finalAdjusted = data.length > 0 ? data[data.length - 1].adjusted : 0;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 rounded-3xl glass-effect border border-white/10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-1 space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-muted">Monthly Investment</label>
              <span className="text-sm font-bold text-foreground">{formatCurrency(monthlyInvestment)}</span>
            </div>
            <input 
              type="range" min="500" max="100000" step="500" 
              value={monthlyInvestment} 
              onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
              className="w-full accent-gold-start"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-muted">Time Period</label>
              <span className="text-sm font-bold text-foreground">{years} Years</span>
            </div>
            <input 
              type="range" min="1" max="30" step="1" 
              value={years} 
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-gold-start"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-muted">Expected Return</label>
              <span className="text-sm font-bold text-foreground">{expectedReturn}%</span>
            </div>
            <input 
              type="range" min="4" max="20" step="1" 
              value={expectedReturn} 
              onChange={(e) => setExpectedReturn(Number(e.target.value))}
              className="w-full accent-gold-start"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium text-muted">Inflation Rate</label>
              <span className="text-sm font-bold text-foreground">{inflationRate}%</span>
            </div>
            <input 
              type="range" min="2" max="12" step="1" 
              value={inflationRate} 
              onChange={(e) => setInflationRate(Number(e.target.value))}
              className="w-full accent-steel-start"
            />
          </div>
        </div>

        {/* Chart & Stats */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="mb-8 flex flex-col sm:flex-row gap-8 justify-between">
            <div>
              <p className="text-sm text-muted uppercase tracking-wider mb-1 font-semibold">Future Net Worth</p>
              <h3 className="text-3xl md:text-4xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-gold-start to-gold-end">
                {formatCurrency(finalNominal)}
              </h3>
            </div>
            <div>
              <p className="text-sm text-muted uppercase tracking-wider mb-1 font-semibold">Inflation-Adjusted Value</p>
              <h3 className="text-xl md:text-2xl font-heading font-bold text-steel-end">
                {formatCurrency(finalAdjusted)}
              </h3>
            </div>
          </div>

          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis 
                  dataKey="year" 
                  stroke="#9A9DA6" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  minTickGap={30}
                />
                <YAxis 
                  stroke="#9A9DA6" 
                  fontSize={12} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
                  width={60}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#14161A', borderColor: '#334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#F5F5F5' }}
                  formatter={(value) => formatCurrency(Number(value || 0))}
                  labelStyle={{ color: '#9A9DA6', marginBottom: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="nominal" 
                  name="Future Value"
                  stroke="#D4AF37" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6, fill: '#D4AF37', stroke: '#14161A', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="adjusted" 
                  name="Inflation Adjusted"
                  stroke="#4A4E57" 
                  strokeWidth={3} 
                  dot={false}
                  activeDot={{ r: 6, fill: '#4A4E57', stroke: '#14161A', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
