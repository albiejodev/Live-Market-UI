import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

export const MarketSentiment: React.FC = () => {
  const value = 78; // 0-100
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  
  // Create a semi-circle gauge using Recharts Pie
  // Data array needs to represent the filled part and empty part
  // Also we use startAngle 180 and endAngle 0 for semi-circle
  const data = [
    { name: 'Value', value: normalizedValue, color: '#10b981' }, // Green for greed
    { name: 'Empty', value: 100 - normalizedValue, color: '#2a2e39' }
  ];

  return (
    <div className="bg-trade-card border border-trade-border rounded-radius-card p-5 h-full flex flex-col">
      <h3 className="font-medium text-trade-text-primary mb-2">Market Sentiment</h3>
      
      <div className="flex-1 relative flex flex-col items-center justify-center pt-8">
        <div className="w-full h-[150px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius="75%"
                outerRadius="100%"
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          
          {/* Needle / Indicator could go here, for simplicity we put text */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pb-2">
            <span className="text-4xl font-bold text-trade-up">{value}</span>
            <span className="text-trade-text-primary font-medium tracking-wide mt-1 uppercase text-sm">Greed</span>
          </div>
        </div>
        
        <div className="flex justify-between w-full mt-4 text-xs text-trade-text-secondary uppercase tracking-wider font-medium px-4">
          <span>Fear</span>
          <span>Greed</span>
        </div>
      </div>
    </div>
  );
};
