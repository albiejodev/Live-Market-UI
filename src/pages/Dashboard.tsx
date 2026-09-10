import React from 'react';
import { PortfolioOverview } from '../components/dashboard/PortfolioOverview';
import { AssetAllocationContainer } from '../components/dashboard/AssetAllocationContainer';
import { MarketSentiment } from '../components/dashboard/MarketSentiment';
import { TopMarketsList } from '../components/dashboard/TopMarketsList';
import { TradingChart } from '../components/charts/TradingChart';
import { PerformanceChart } from '../components/charts/PerformanceChart';
import { TradingSignals } from '../components/dashboard/TradingSignals';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { PortfolioChart } from '../components/charts/PortfolioChart';
import { useMarketStore } from '../stores/marketStore';

const Dashboard: React.FC = () => {
  const selectedSymbol = useMarketStore(state => state.selectedSymbol);

  return (
    <div className="flex flex-col gap-6 pb-6">
      {/* KPI Cards */}
      {/* KPI Cards */}
      <PortfolioOverview />

      {/* Top Row: Portfolio & Allocation & Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PortfolioChart />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex-1">
            <AssetAllocationContainer />
          </div>
          <div className="flex-1">
            <MarketSentiment />
          </div>
        </div>
      </div>

      {/* Middle Row: Top Markets & Trading Signals */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TopMarketsList />
        </div>
        <div>
          <TradingSignals />
        </div>
      </div>

      {/* Bottom Row: Trading Chart & Performance & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TradingChart symbol={selectedSymbol} />
        </div>
        <div className="flex flex-col gap-6">
          <div className="h-[250px]">
            <PerformanceChart />
          </div>
          <div className="flex-1">
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
