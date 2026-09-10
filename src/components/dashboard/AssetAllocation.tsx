import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface AllocationProps {
  data: { name: string; value: number; color: string }[];
  totalValue: string;
}

export const AssetAllocation: React.FC<AllocationProps> = ({ data, totalValue }) => {
  return (
    <div className="bg-trade-card border border-trade-border rounded-radius-card p-5 h-full flex flex-col">
      <h3 className="font-medium text-trade-text-primary mb-6">Asset Allocation</h3>
      
      <div className="flex-1 relative min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#131722', border: '1px solid #2a2e39', borderRadius: '8px' }}
              itemStyle={{ color: '#f1f5f9' }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-trade-text-secondary text-sm">Total</span>
          <span className="text-xl font-bold text-trade-text-primary">{totalValue}</span>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm font-medium">{item.name}</span>
            <span className="text-sm text-trade-text-secondary ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
