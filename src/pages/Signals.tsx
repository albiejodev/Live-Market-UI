import React from 'react';
import { Target, Activity } from 'lucide-react';

const Signals: React.FC = () => {
  const signals = [
    { id: 1, asset: 'BTC/USDT', type: 'LONG', entry: 67200, target: 71000, stop: 65000, conf: 82, status: 'Active' },
    { id: 2, asset: 'ETH/USDT', type: 'SHORT', entry: 3500, target: 3200, stop: 3650, conf: 74, status: 'Pending' },
    { id: 3, asset: 'SOL/USDT', type: 'LONG', entry: 142, target: 160, stop: 135, conf: 88, status: 'Active' },
    { id: 4, asset: 'AVAX/USDT', type: 'LONG', entry: 34, target: 42, stop: 31, conf: 65, status: 'Completed' },
  ];

  return (
    <div className="flex flex-col gap-6 pb-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-trade-text-primary">Trading Signals</h2>
        <div className="bg-trade-accent/10 border border-trade-accent/30 text-trade-accent px-3 py-1 rounded text-xs font-medium">
          Simulated / Educational Data
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {signals.map(sig => (
          <div key={sig.id} className="bg-trade-card border border-trade-border rounded-radius-card p-5 relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${sig.type === 'LONG' ? 'bg-trade-up' : 'bg-trade-down'}`}></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/5`}>
                  <Activity size={20} className={sig.type === 'LONG' ? 'text-trade-up' : 'text-trade-down'} />
                </div>
                <div>
                  <h3 className="font-bold text-trade-text-primary text-lg">{sig.asset}</h3>
                  <div className={`text-xs font-bold inline-block px-2 py-0.5 mt-1 rounded ${sig.type === 'LONG' ? 'bg-trade-up-bg text-trade-up' : 'bg-trade-down-bg text-trade-down'}`}>
                    {sig.type}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-trade-text-secondary">Confidence</div>
                <div className="font-bold text-trade-text-primary text-lg">{sig.conf}%</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-3 text-center border border-white/5">
                <div className="text-xs text-trade-text-secondary mb-1">Entry</div>
                <div className="font-mono text-trade-text-primary">${sig.entry}</div>
              </div>
              <div className="bg-trade-up-bg/20 rounded-lg p-3 text-center border border-trade-up/10">
                <div className="text-xs text-trade-up mb-1 flex items-center justify-center gap-1">
                  <Target size={12} /> Target
                </div>
                <div className="font-mono text-trade-text-primary">${sig.target}</div>
              </div>
              <div className="bg-trade-down-bg/20 rounded-lg p-3 text-center border border-trade-down/10">
                <div className="text-xs text-trade-down mb-1">Stop Loss</div>
                <div className="font-mono text-trade-text-primary">${sig.stop}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-trade-border pt-4">
              <div className="text-sm text-trade-text-secondary">
                Status: <span className="text-trade-text-primary font-medium">{sig.status}</span>
              </div>
              <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded text-sm transition-colors text-trade-text-primary">
                View Analysis
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Signals;
