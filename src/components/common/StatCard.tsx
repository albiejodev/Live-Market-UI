import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  sparklineData?: number[];
}

export const StatCard: React.FC<StatCardProps> = React.memo(({ title, value, change, icon, sparklineData = [] }) => {
  const isPositive = change >= 0;
  
  // Format sparkline data for Recharts
  const chartData = sparklineData.map((val, i) => ({ index: i, value: val }));
  
  return (
    <div className="bg-trade-card border border-trade-border rounded-radius-card p-5 relative overflow-hidden group">
      {/* Subtle background glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-2 text-trade-text-secondary">
          <div className="p-2 bg-white/5 rounded-lg text-trade-text-primary">
            {icon}
          </div>
          <span className="font-medium text-sm">{title}</span>
        </div>
        <div className={`text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'bg-trade-up-bg text-trade-up' : 'bg-trade-down-bg text-trade-down'}`}>
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </div>
      </div>
      
      <div className="flex items-end justify-between relative z-10">
        <div>
          <div className="text-2xl font-bold text-trade-text-primary">{value}</div>
        </div>
        
        {chartData.length > 0 && (
          <div className="w-24 h-10 opacity-70">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id={`colorValue-${title}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke={isPositive ? '#10b981' : '#ef4444'} 
                  fillOpacity={1} 
                  fill={`url(#colorValue-${title})`} 
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
});
