import React from 'react';
import { MarketRow } from '../common/MarketRow';
import { useMarketStore } from '../../stores/marketStore';
import { useShallow } from 'zustand/react/shallow';

export const TopMarketsList: React.FC = () => {
  // Use shallow compare so it only re-renders when the actual top markets array changes 
  // (which is rare, mostly just their price references, but in our case we are mapping over it).
  // Wait, if the tickers object changes, useShallow on map might still see new objects if we update them immutably.
  // We can just subscribe to the specific top market symbols.
  const symbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT', 'AVAXUSDT'];
  
  const topMarkets = useMarketStore(
    useShallow(state => 
      symbols.map(sym => state.tickers[sym]).filter(Boolean)
    )
  );
  
  return (
    <div className="bg-trade-card border border-trade-border rounded-radius-card p-5">
      <h3 className="font-medium text-trade-text-primary mb-4">Top Markets</h3>
      <div className="flex flex-col divide-y divide-trade-border/50">
        {topMarkets.map(ticker => (
          <MarketRow 
            key={ticker.symbol} 
            ticker={ticker} 
          />
        ))}
        {topMarkets.length === 0 && (
          <div className="py-8 text-center text-trade-text-secondary">Loading markets...</div>
        )}
      </div>
    </div>
  );
};
