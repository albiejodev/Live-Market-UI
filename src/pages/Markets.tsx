import React, { useState, useMemo } from 'react';
import { useMarketStore } from '../stores/marketStore';
import { MarketRow } from '../components/common/MarketRow';
import { Search, ArrowUpDown } from 'lucide-react';

const Markets: React.FC = () => {
  const tickers = useMarketStore(state => state.tickers);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'symbol' | 'price' | 'change' | 'volume'>('volume');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedMarkets = useMemo(() => {
    let result = Object.values(tickers);
    
    if (search) {
      result = result.filter(t => t.symbol.toLowerCase().includes(search.toLowerCase()));
    }
    
    result.sort((a, b) => {
      let aVal, bVal;
      switch (sortKey) {
        case 'symbol': aVal = a.symbol; bVal = b.symbol; break;
        case 'price': aVal = a.price; bVal = b.price; break;
        case 'change': aVal = a.changePercent24h; bVal = b.changePercent24h; break;
        case 'volume': aVal = a.volume24h; bVal = b.volume24h; break;
        default: aVal = a.volume24h; bVal = b.volume24h;
      }
      
      if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    
    return result;
  }, [tickers, search, sortKey, sortOrder]);

  return (
    <div className="flex flex-col gap-6 pb-6 h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-trade-text-primary">Markets</h2>
        
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-trade-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search markets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-trade-card border border-trade-border rounded-lg py-2 pl-10 pr-4 text-sm text-trade-text-primary focus:outline-none focus:border-trade-accent transition-colors"
          />
        </div>
      </div>
      
      <div className="bg-trade-card border border-trade-border rounded-radius-card overflow-hidden flex-1 flex flex-col">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-trade-border text-sm font-medium text-trade-text-secondary">
          <div className="col-span-4 flex items-center gap-2 cursor-pointer hover:text-white" onClick={() => handleSort('symbol')}>
            Market <ArrowUpDown size={14} />
          </div>
          <div className="col-span-3 text-right flex items-center justify-end gap-2 cursor-pointer hover:text-white" onClick={() => handleSort('price')}>
            Price <ArrowUpDown size={14} />
          </div>
          <div className="col-span-2 text-right flex items-center justify-end gap-2 cursor-pointer hover:text-white" onClick={() => handleSort('change')}>
            24h Change <ArrowUpDown size={14} />
          </div>
          <div className="col-span-3 text-right flex items-center justify-end gap-2 cursor-pointer hover:text-white" onClick={() => handleSort('volume')}>
            24h Volume <ArrowUpDown size={14} />
          </div>
        </div>
        
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {filteredAndSortedMarkets.map(ticker => (
            <div key={ticker.symbol} className="border-b border-trade-border/50 last:border-0 hover:bg-white/5 transition-colors">
              <MarketRow ticker={ticker} />
            </div>
          ))}
          {filteredAndSortedMarkets.length === 0 && (
            <div className="p-8 text-center text-trade-text-secondary">
              {Object.keys(tickers).length === 0 ? 'Loading market data...' : 'No markets found matching your search.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Markets;
