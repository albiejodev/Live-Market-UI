import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = {
  '1D': Array.from({ length: 24 }, (_, i) => ({ time: `${i}:00`, value: 45000 + Math.random() * 5000 })),
  '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 42000 + Math.random() * 8000 })),
  '1M': Array.from({ length: 30 }, (_, i) => ({ time: `${i+1}`, value: 40000 + Math.random() * 12000 })),
  '3M': Array.from({ length: 12 }, (_, i) => ({ time: `Wk ${i+1}`, value: 35000 + Math.random() * 20000 })),
  '1Y': Array.from({ length: 12 }, (_, i) => ({ time: `Mo ${i+1}`, value: 25000 + Math.random() * 30000 })),
};

export const PortfolioChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1M');
  const chartData = data[timeframe];
  
  const currentValue = chartData[chartData.length - 1].value;
  const startValue = chartData[0].value;
  const isPositive = currentValue >= startValue;
  const changePercent = ((currentValue - startValue) / startValue) * 100;

  return (
    <div className="bg-trade-card border border-trade-border rounded-radius-card p-5">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <div>
          <h3 className="text-trade-text-secondary font-medium mb-1">Portfolio Performance</h3>
          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-trade-text-primary">
              ${currentValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </span>
            <span className={`text-sm font-medium mb-1 ${isPositive ? 'text-trade-up' : 'text-trade-down'}`}>
              {isPositive ? '+' : ''}{changePercent.toFixed(2)}%
            </span>
          </div>
        </div>
        
        <div className="flex bg-white/5 rounded-lg p-1">
          {['1D', '1W', '1M', '3M', '1Y'].map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf as any)}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                timeframe === tf 
                  ? 'bg-trade-accent/20 text-trade-accent font-medium' 
                  : 'text-trade-text-secondary hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>
      
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2e39" vertical={false} />
            <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#64748b' }} tickLine={false} axisLine={false} />
            <YAxis 
              stroke="#64748b" 
              tick={{ fill: '#64748b' }} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#131722', border: '1px solid #2a2e39', borderRadius: '8px' }}
              itemStyle={{ color: '#f1f5f9' }}
              labelStyle={{ color: '#94a3b8' }}
              formatter={(value: any) => [`$${value.toFixed(2)}`, 'Value']}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? '#10b981' : '#ef4444'} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorValue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
