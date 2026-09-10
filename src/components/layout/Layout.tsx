import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useMarketData } from '../../hooks/useMarketData';

export const Layout: React.FC = () => {
  // Initialize market data hook at layout level
  useMarketData();

  return (
    <div className="flex h-screen bg-trade-bg text-trade-text-primary overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
