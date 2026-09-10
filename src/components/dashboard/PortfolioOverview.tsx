import React from 'react';
import { StatCard } from '../common/StatCard';
import { useMarketStore } from '../../stores/marketStore';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { Wallet, TrendingUp, Target, Layers } from 'lucide-react';
import { formatCurrency } from '../../utils/formatting';
import { useShallow } from 'zustand/react/shallow';

export const PortfolioOverview: React.FC = () => {
  const balance = usePortfolioStore((state) => state.balance);
  const holdings = usePortfolioStore((state) => state.holdings);
  
  const prices = useMarketStore(useShallow(state => {
    const p: Record<string, number> = {};
    holdings.forEach(asset => {
      p[asset.symbol] = state.tickers[asset.symbol]?.price || asset.averagePrice;
    });
    return p;
  }));

  const totalValue = React.useMemo(() => {
    return balance + holdings.reduce((acc, asset) => {
      return acc + (prices[asset.symbol] * asset.quantity);
    }, 0);
  }, [balance, holdings, prices]);

  const btcSparkline = useMarketStore(state => state.tickers['BTCUSDT']?.sparkline);
  const ethSparkline = useMarketStore(state => state.tickers['ETHUSDT']?.sparkline);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        title="Total Portfolio" 
        value={formatCurrency(totalValue)} 
        change={6.21} 
        icon={<Wallet size={20} />} 
        sparklineData={btcSparkline}
      />
      <StatCard 
        title="24H P&L" 
        value="+$2,340.00" 
        change={5.08} 
        icon={<TrendingUp size={20} />} 
        sparklineData={ethSparkline}
      />
      <StatCard 
        title="Win Rate" 
        value="72%" 
        change={4.00} 
        icon={<Target size={20} />} 
      />
      <StatCard 
        title="Active Positions" 
        value={holdings.length.toString()} 
        change={0} 
        icon={<Layers size={20} />} 
      />
    </div>
  );
};
