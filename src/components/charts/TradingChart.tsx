import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import type { IChartApi, CandlestickSeriesPartialOptions } from 'lightweight-charts';
import { useMarketStore } from '../../stores/marketStore';

interface TradingChartProps {
  symbol: string;
}

export const TradingChart: React.FC<TradingChartProps> = ({ symbol }) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const currentPriceRef = useRef<number | undefined>(undefined);
  // Get initial price without subscribing to updates
  const initialPrice = useMarketStore.getState().tickers[symbol]?.price;
  
  // Historical data generation for demo
  const generateHistoricalData = (basePrice: number) => {
    const data = [];
    let price = basePrice * 0.95;
    const now = Math.floor(Date.now() / 1000);
    
    for (let i = 100; i >= 1; i--) {
      const time = now - (i * 60 * 60); // 1 hour candles
      const open = price;
      const high = price * (1 + Math.random() * 0.01);
      const low = price * (1 - Math.random() * 0.01);
      const close = (open + high + low) / 3;
      
      data.push({ time: time as any, open, high, low, close });
      price = close;
    }
    return data;
  };

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94a3b8',
      },
      grid: {
        vertLines: { color: 'rgba(42, 46, 57, 0.5)' },
        horzLines: { color: 'rgba(42, 46, 57, 0.5)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
      rightPriceScale: {
        borderVisible: false,
      },
    });
    
    chartRef.current = chart;

    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#10b981',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#10b981',
      wickDownColor: '#ef4444',
    } as CandlestickSeriesPartialOptions);

    // Initial data
    const basePrice = initialPrice || 67000;
    currentPriceRef.current = basePrice;
    
    const initialData = generateHistoricalData(basePrice);
    candlestickSeries.setData(initialData);

    // Subscribe to price changes without re-rendering
    const unsubscribe = useMarketStore.subscribe(
      (state) => {
        const newPrice = state.tickers[symbol]?.price;
        if (!newPrice || newPrice === currentPriceRef.current) return;
        
        // We'd update the candle here in a real app
        // Example: update the last candle's close price
        const lastData = initialData[initialData.length - 1];
        if (lastData) {
          candlestickSeries.update({
            time: lastData.time,
            open: lastData.open,
            high: Math.max(lastData.high, newPrice),
            low: Math.min(lastData.low, newPrice),
            close: newPrice,
          });
        }
        currentPriceRef.current = newPrice;
      }
    );

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol]); // Re-create chart when symbol changes



  return (
    <div className="bg-trade-card border border-trade-border rounded-radius-card p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h3 className="font-semibold">{symbol.replace('USDT', '/USDT')}</h3>
          <div className="flex bg-white/5 rounded-md p-0.5">
            {['1H', '1D', '1W', '1M'].map((tf) => (
              <button 
                key={tf}
                className={`px-3 py-1 text-xs rounded-md ${tf === '1H' ? 'bg-white/10 text-white' : 'text-trade-text-secondary hover:text-white'}`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div ref={chartContainerRef} className="w-full h-[400px]" />
    </div>
  );
};
