import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Mon', 'This Week': 4000, 'Last Week': 2400 },
  { name: 'Tue', 'This Week': 3000, 'Last Week': 1398 },
  { name: 'Wed', 'This Week': 2000, 'Last Week': 9800 },
  { name: 'Thu', 'This Week': 2780, 'Last Week': 3908 },
  { name: 'Fri', 'This Week': 1890, 'Last Week': 4800 },
  { name: 'Sat', 'This Week': 2390, 'Last Week': 3800 },
  { name: 'Sun', 'This Week': 3490, 'Last Week': 4300 },
];

export const PerformanceChart: React.FC = () => {
  return (
    <div className="bg-trade-card border border-trade-border rounded-radius-card p-5 h-full flex flex-col">
      <h3 className="font-medium text-trade-text-primary mb-6">Performance</h3>
      
      <div className="flex-1 w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2e39" vertical={false} />
            <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#64748b', fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis 
              stroke="#64748b" 
              tick={{ fill: '#64748b', fontSize: 12 }} 
              tickLine={false} 
              axisLine={false} 
              tickFormatter={(value) => `$${value/1000}k`}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#131722', border: '1px solid #2a2e39', borderRadius: '8px' }}
              itemStyle={{ color: '#f1f5f9' }}
              labelStyle={{ color: '#94a3b8' }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
            />
            <Legend 
              verticalAlign="top" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
            />
            <Bar dataKey="This Week" fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={12} />
            <Bar dataKey="Last Week" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
