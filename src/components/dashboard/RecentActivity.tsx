import React from 'react';
import { formatPercent } from '../../utils/formatting';

export const RecentActivity: React.FC = () => {
  const activities = [
    { id: '1', asset: 'BTC/USDT', action: 'LONG', pnl: 2.45, time: '10 mins ago' },
    { id: '2', asset: 'ETH/USDT', action: 'LONG', pnl: 1.32, time: '1 hr ago' },
    { id: '3', asset: 'SOL/USDT', action: 'SHORT', pnl: -1.08, time: '2 hrs ago' },
    { id: '4', asset: 'AVAX/USDT', action: 'LONG', pnl: 5.42, time: '4 hrs ago' },
    { id: '5', asset: 'XRP/USDT', action: 'SHORT', pnl: 0.54, time: '5 hrs ago' },
  ];

  return (
    <div className="bg-trade-card border border-trade-border rounded-radius-card p-5 h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium text-trade-text-primary">Recent Activity</h3>
        <button className="text-xs text-trade-accent hover:text-trade-accent/80 transition-colors">View All</button>
      </div>
      
      <div className="space-y-4">
        {activities.map((act) => (
          <div key={act.id} className="flex items-center justify-between group">
            <div>
              <div className="font-medium text-trade-text-primary mb-1 group-hover:text-trade-accent transition-colors">
                {act.asset}
              </div>
              <div className="text-xs text-trade-text-secondary">{act.time}</div>
            </div>
            
            <div className="text-right">
              <div className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mb-1 ${
                act.action === 'LONG' ? 'bg-trade-up-bg text-trade-up' : 'bg-trade-down-bg text-trade-down'
              }`}>
                {act.action}
              </div>
              <div className={`text-sm font-medium ${act.pnl >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>
                {formatPercent(act.pnl)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
