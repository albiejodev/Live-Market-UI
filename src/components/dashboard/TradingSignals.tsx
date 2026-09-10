import React, { useState, useEffect } from 'react';
import { Target, AlertTriangle } from 'lucide-react';

export const TradingSignals: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(18 * 60 + 24); // 18m 24s
  const [activeSignal, setActiveSignal] = useState({
    asset: 'BTC/USDT',
    action: 'LONG',
    confidence: 82
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Generate new signal
          const assets = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'AVAX/USDT'];
          const actions = ['LONG', 'SHORT', 'HOLD'];
          setActiveSignal({
            asset: assets[Math.floor(Math.random() * assets.length)],
            action: actions[Math.floor(Math.random() * actions.length)],
            confidence: Math.floor(Math.random() * 30) + 60, // 60-90
          });
          return 15 * 60; // 15 mins
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `00:${m}:${s}`;
  };

  return (
    <div className="bg-trade-card border border-trade-border rounded-radius-card p-5 h-full flex flex-col relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-trade-accent opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity"></div>
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="font-medium text-trade-text-primary flex items-center gap-2">
            AI Trading Signal
          </h3>
          <div className="text-xs text-trade-text-secondary mt-1 flex items-center gap-1">
            <AlertTriangle size={12} className="text-yellow-500" />
            SIMULATED SIGNAL
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center relative z-10 my-4">
        <div className="w-32 h-32 rounded-full border-4 border-white/5 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-4 border-trade-accent border-t-transparent animate-spin" style={{ animationDuration: '3s' }}></div>
          <Target size={24} className="text-trade-accent mb-2" />
          <div className="text-sm text-trade-text-secondary">Next Signal</div>
          <div className="font-mono text-lg font-bold text-trade-text-primary">{formatTime(timeLeft)}</div>
        </div>
      </div>

      <div className="bg-white/5 rounded-lg p-4 relative z-10 border border-white/5">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold text-trade-text-primary">{activeSignal.asset}</span>
          <span className={`text-xs font-bold px-2 py-1 rounded ${
            activeSignal.action === 'LONG' ? 'bg-trade-up-bg text-trade-up' : 
            activeSignal.action === 'SHORT' ? 'bg-trade-down-bg text-trade-down' : 
            'bg-white/10 text-white'
          }`}>
            {activeSignal.action}
          </span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-trade-text-secondary">Confidence</span>
          <span className="text-trade-text-primary font-medium">{activeSignal.confidence}%</span>
        </div>
      </div>
    </div>
  );
};
