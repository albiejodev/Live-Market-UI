import React from 'react';
import { AssetAllocation } from './AssetAllocation';
import { useMarketStore } from '../../stores/marketStore';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { formatCurrency } from '../../utils/formatting';
import { useShallow } from 'zustand/react/shallow';

export const AssetAllocationContainer: React.FC = () => {
  const balance = usePortfolioStore((state) => state.balance);
  const holdings = usePortfolioStore((state) => state.holdings);
  
  // Fetch stable primitive prices
  const prices = useMarketStore(useShallow(state => {
    const p: Record<string, number> = {};
    holdings.forEach(asset => {
      p[asset.symbol] = state.tickers[asset.symbol]?.price || asset.averagePrice;
    });
    return p;
  }));

  const { totalValue, allocationData } = React.useMemo(() => {
    let tv = balance;
    holdings.forEach(asset => {
      tv += (prices[asset.symbol] * asset.quantity);
    });

    const alloc = holdings.map((h, i) => {
      const price = prices[h.symbol];
      const value = price * h.quantity;
      const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
      return {
        name: h.symbol.replace('USDT', ''),
        value: Number(((value / tv) * 100).toFixed(1)),
        color: colors[i % colors.length]
      };
    });

    return { totalValue: tv, allocationData: alloc };
  }, [balance, holdings, prices]);

  return (
    <AssetAllocation 
      data={allocationData} 
      totalValue={formatCurrency(totalValue, 0)} 
    />
  );
};
