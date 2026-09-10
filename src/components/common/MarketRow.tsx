import React from 'react';
import type { MarketTicker } from '../../types/market';
import { formatCurrency, formatPercent } from '../../utils/formatting';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useMarketStore } from '../../stores/marketStore';

interface MarketRowProps {
  ticker: MarketTicker;
}

export const MarketRow: React.FC<MarketRowProps> = React.memo(({ ticker }) => {
  const setSelectedSymbol = useMarketStore(state => state.setSelectedSymbol);
  
  const isPositive = ticker.changePercent24h >= 0;
  const chartData = (ticker.sparkline || []).map((val, i) => ({ index: i, value: val }));
  
  // Format pair (e.g. BTCUSDT -> BTC/USDT)
  const base = ticker.symbol.replace('USDT', '');
  const quote = 'USDT';

  return (
    <div 
      onClick={() => setSelectedSymbol(ticker.symbol)}
      className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-trade-border group"
    >
      <div className="flex items-center gap-3 w-1/3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">
          {base.substring(0, 3)}
        </div>
        <div>
          <div className="font-semibold text-trade-text-primary flex items-center gap-1">
            {base} <span className="text-xs font-normal text-trade-text-secondary">/{quote}</span>
          </div>
          <div className="text-xs text-trade-text-secondary">Vol {formatCurrency(ticker.volume24h, 0)}</div>
        </div>
      </div>
      
      <div className="w-1/4 text-right">
        <div className="font-mono font-medium text-trade-text-primary">{formatCurrency(ticker.price)}</div>
        <div className={`text-xs flex items-center justify-end gap-1 ${isPositive ? 'text-trade-up' : 'text-trade-down'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {formatPercent(ticker.changePercent24h)}
        </div>
      </div>
      
      <div className="w-1/4 h-8 opacity-60 group-hover:opacity-100 transition-opacity">
        {chartData.length > 0 && (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={isPositive ? '#10b981' : '#ef4444'} 
                fill="transparent" 
                strokeWidth={1.5}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
});
