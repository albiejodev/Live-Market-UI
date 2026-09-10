import React from 'react';
import { useMarketStore } from '../../stores/marketStore';
import { Bell, User, WifiOff, RefreshCcw } from 'lucide-react';

export const Header: React.FC = () => {
  const connectionStatus = useMarketStore((state) => state.connectionStatus);
  const isSimulation = useMarketStore((state) => state.isSimulation);
  const setSimulationMode = useMarketStore((state) => state.setSimulationMode);

  return (
    <header className="h-16 bg-trade-bg border-b border-trade-border flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold m-0 text-trade-text-primary">Dashboard</h1>
        <div className="h-4 w-px bg-trade-border mx-2"></div>
        <div className="text-sm text-trade-text-secondary">
          Currency: <span className="text-trade-text-primary font-medium">USD</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          {connectionStatus === 'LIVE' && !isSimulation && (
            <div className="flex items-center gap-2 text-trade-up text-xs font-medium px-2 py-1 rounded-full bg-trade-up-bg border border-trade-up/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-trade-up opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-trade-up"></span>
              </span>
              LIVE
            </div>
          )}
          {connectionStatus === 'OFFLINE' && !isSimulation && (
            <div className="flex items-center gap-2 text-trade-down text-xs font-medium px-2 py-1 rounded-full bg-trade-down-bg border border-trade-down/20">
              <WifiOff size={12} />
              OFFLINE
            </div>
          )}
          {connectionStatus === 'CONNECTING' && !isSimulation && (
            <div className="flex items-center gap-2 text-trade-secondary text-xs font-medium px-2 py-1 rounded-full bg-trade-secondary/10 border border-trade-secondary/20">
              <RefreshCcw size={12} className="animate-spin" />
              CONNECTING
            </div>
          )}
          {connectionStatus === 'RECONNECTING' && !isSimulation && (
            <div className="flex items-center gap-2 text-yellow-500 text-xs font-medium px-2 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              <RefreshCcw size={12} className="animate-spin" />
              RECONNECTING
            </div>
          )}
          
          <button
            onClick={() => setSimulationMode(!isSimulation)}
            className={`text-xs font-medium px-2 py-1 rounded-full border transition-colors ${
              isSimulation 
                ? 'bg-trade-accent/20 text-trade-accent border-trade-accent/50' 
                : 'bg-white/5 text-trade-text-secondary border-trade-border hover:bg-white/10'
            }`}
          >
            SIMULATION
          </button>
        </div>

        <div className="flex items-center gap-4 text-trade-text-secondary">
          <button className="hover:text-trade-text-primary transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-trade-accent rounded-full"></span>
          </button>
          <div className="h-8 w-8 rounded-full bg-trade-border flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors text-trade-text-primary">
            <User size={18} />
          </div>
        </div>
      </div>
    </header>
  );
};
