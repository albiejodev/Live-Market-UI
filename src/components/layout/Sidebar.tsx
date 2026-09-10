import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PieChart, Activity, Radio, BarChart2, Bell, Settings, BrainCircuit } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Portfolio', path: '/portfolio', icon: <PieChart size={20} /> },
    { name: 'Markets', path: '/markets', icon: <Activity size={20} /> },
    { name: 'Signals', path: '/signals', icon: <Radio size={20} /> },
    { name: 'Analytics', path: '/analytics', icon: <BarChart2 size={20} /> },
    { name: 'Alerts', path: '/alerts', icon: <Bell size={20} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="w-64 bg-trade-card border-r border-trade-border h-screen flex flex-col hidden md:flex">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-trade-accent to-trade-secondary flex items-center justify-center text-white font-bold">
          T
        </div>
        <span className="text-xl font-bold tracking-tight text-trade-text-primary">TradeVision</span>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-radius-card transition-all duration-200 ${
                isActive
                  ? 'bg-trade-up-bg text-trade-up font-medium'
                  : 'text-trade-text-secondary hover:bg-white/5 hover:text-trade-text-primary'
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-gradient-to-b from-white/5 to-transparent border border-trade-border rounded-radius-card p-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-trade-accent opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center gap-2 text-trade-accent font-medium mb-2">
            <BrainCircuit size={16} />
            <span className="text-sm">AI MARKET INSIGHT</span>
          </div>
          <div className="text-xs text-trade-text-secondary mb-1">Market sentiment:</div>
          <div className="text-trade-up font-medium mb-2">78 - Greed</div>
          <div className="text-xs text-trade-text-secondary mb-1">Confidence:</div>
          <div className="text-trade-text-primary font-medium mb-3">78%</div>
          <button className="w-full py-1.5 bg-white/5 hover:bg-white/10 text-xs text-trade-text-primary rounded transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
