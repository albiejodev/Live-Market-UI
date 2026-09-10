import React from 'react';
import { usePortfolioStore } from '../stores/portfolioStore';
import { useMarketStore } from '../stores/marketStore';
import { formatCurrency, formatPercent } from '../utils/formatting';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Portfolio: React.FC = () => {
  const { balance, holdings } = usePortfolioStore();
  const tickers = useMarketStore(state => state.tickers);

  const enrichedHoldings = holdings.map(h => {
    const currentPrice = tickers[h.symbol]?.price || h.averagePrice;
    const value = currentPrice * h.quantity;
    const invested = h.averagePrice * h.quantity;
    const pnl = value - invested;
    const pnlPercent = (pnl / invested) * 100;
    
    return { ...h, currentPrice, value, pnl, pnlPercent };
  });

  const totalValue = balance + enrichedHoldings.reduce((acc, h) => acc + h.value, 0);
  const totalInvested = enrichedHoldings.reduce((acc, h) => acc + (h.averagePrice * h.quantity), 0);
  const totalPnl = enrichedHoldings.reduce((acc, h) => acc + h.pnl, 0);
  const totalPnlPercent = totalInvested > 0 ? (totalPnl / totalInvested) * 100 : 0;

  const allocationData = enrichedHoldings.map((h, i) => {
    const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444'];
    return {
      name: h.symbol.replace('USDT', ''),
      value: h.value,
      color: colors[i % colors.length]
    };
  });

  return (
    <div className="flex flex-col gap-6 pb-6 h-full">
      <h2 className="text-2xl font-semibold text-trade-text-primary">Portfolio</h2>
      
      {/* Portfolio Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-trade-card border border-trade-border rounded-radius-card p-5">
          <div className="text-sm text-trade-text-secondary mb-2">Total Balance</div>
          <div className="text-3xl font-bold text-trade-text-primary">{formatCurrency(totalValue)}</div>
        </div>
        <div className="bg-trade-card border border-trade-border rounded-radius-card p-5">
          <div className="text-sm text-trade-text-secondary mb-2">Available Balance</div>
          <div className="text-3xl font-bold text-trade-text-primary">{formatCurrency(balance)}</div>
        </div>
        <div className="bg-trade-card border border-trade-border rounded-radius-card p-5">
          <div className="text-sm text-trade-text-secondary mb-2">Total Invested</div>
          <div className="text-3xl font-bold text-trade-text-primary">{formatCurrency(totalInvested)}</div>
        </div>
        <div className="bg-trade-card border border-trade-border rounded-radius-card p-5">
          <div className="text-sm text-trade-text-secondary mb-2">Total P&L</div>
          <div className={`text-3xl font-bold ${totalPnl >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>
            {totalPnl >= 0 ? '+' : ''}{formatCurrency(totalPnl)}
          </div>
          <div className={`text-sm mt-1 ${totalPnlPercent >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>
            {formatPercent(totalPnlPercent)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        <div className="lg:col-span-2 bg-trade-card border border-trade-border rounded-radius-card overflow-hidden flex flex-col">
          <div className="p-5 border-b border-trade-border">
            <h3 className="font-medium text-trade-text-primary">Your Assets</h3>
          </div>
          
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-trade-border text-sm font-medium text-trade-text-secondary">
            <div className="col-span-1">Asset</div>
            <div className="col-span-1 text-right">Quantity</div>
            <div className="col-span-1 text-right">Avg Price</div>
            <div className="col-span-1 text-right">Price</div>
            <div className="col-span-1 text-right">Value</div>
            <div className="col-span-1 text-right">P&L</div>
          </div>
          
          <div className="overflow-y-auto custom-scrollbar flex-1">
            {enrichedHoldings.map(h => (
              <div key={h.symbol} className="grid grid-cols-6 gap-4 p-4 border-b border-trade-border/50 hover:bg-white/5 transition-colors items-center text-sm">
                <div className="col-span-1 font-medium text-trade-text-primary">
                  {h.symbol.replace('USDT', '')}
                </div>
                <div className="col-span-1 text-right text-trade-text-primary">{h.quantity}</div>
                <div className="col-span-1 text-right text-trade-text-secondary">{formatCurrency(h.averagePrice)}</div>
                <div className="col-span-1 text-right text-trade-text-primary">{formatCurrency(h.currentPrice)}</div>
                <div className="col-span-1 text-right font-medium text-trade-text-primary">{formatCurrency(h.value)}</div>
                <div className={`col-span-1 text-right font-medium ${h.pnl >= 0 ? 'text-trade-up' : 'text-trade-down'}`}>
                  <div>{formatCurrency(h.pnl)}</div>
                  <div className="text-xs">{formatPercent(h.pnlPercent)}</div>
                </div>
              </div>
            ))}
            {enrichedHoldings.length === 0 && (
              <div className="p-8 text-center text-trade-text-secondary">No assets found in portfolio.</div>
            )}
          </div>
        </div>
        
        <div className="bg-trade-card border border-trade-border rounded-radius-card p-5 flex flex-col">
          <h3 className="font-medium text-trade-text-primary mb-6">Allocation</h3>
          
          <div className="flex-1 relative min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocationData}
                  innerRadius="60%"
                  outerRadius="80%"
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {allocationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#131722', border: '1px solid #2a2e39', borderRadius: '8px' }}
                  itemStyle={{ color: '#f1f5f9' }}
                  formatter={(value: any) => formatCurrency(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 space-y-3">
            {allocationData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <span className="text-sm text-trade-text-secondary">
                  {((item.value / totalValue) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
