import { useMarketStore } from '../../stores/marketStore';

const SYMBOLS = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT', 'AVAXUSDT'];
const BASE_PRICES: Record<string, number> = {
  BTCUSDT: 67000,
  ETHUSDT: 3500,
  SOLUSDT: 145,
  XRPUSDT: 0.58,
  AVAXUSDT: 35,
};

let simTimer: number | null = null;

const generateRandomWalk = (currentPrice: number) => {
  const volatility = 0.001; // 0.1% max change per tick
  const change = 1 + (Math.random() * volatility * 2 - volatility);
  return currentPrice * change;
};

export const startSimulation = () => {
  const store = useMarketStore.getState();
  if (simTimer) return;

  store.setConnectionStatus('LIVE');

  // Initialize base prices if they don't exist
  SYMBOLS.forEach((sym) => {
    if (!store.tickers[sym]) {
      store.setTicker(sym, {
        symbol: sym,
        price: BASE_PRICES[sym],
        change24h: 0,
        changePercent24h: 0,
        high24h: BASE_PRICES[sym] * 1.05,
        low24h: BASE_PRICES[sym] * 0.95,
        volume24h: BASE_PRICES[sym] * 1000,
        sparkline: Array.from({ length: 20 }, () => BASE_PRICES[sym] * (1 + (Math.random() * 0.02 - 0.01))),
      });
    }
  });

  simTimer = window.setInterval(() => {
    const currentStore = useMarketStore.getState();
    if (!currentStore.isSimulation) {
      stopSimulation();
      return;
    }

    const updates: Record<string, any> = {};

    SYMBOLS.forEach((sym) => {
      const current = currentStore.tickers[sym];
      if (current) {
        const newPrice = generateRandomWalk(current.price);
        const changeValue = newPrice - BASE_PRICES[sym];
        const changePercent = (changeValue / BASE_PRICES[sym]) * 100;

        const newSparkline = [...(current.sparkline || [])];
        if (newSparkline.length >= 20) newSparkline.shift(); // ensure cap at 20
        newSparkline.push(newPrice);

        updates[sym] = {
          price: newPrice,
          change24h: changeValue,
          changePercent24h: changePercent,
          sparkline: newSparkline,
        };
      }
    });

    if (Object.keys(updates).length > 0) {
      currentStore.setTickers(updates);
    }
  }, 2000); // update every 2 seconds
};

export const stopSimulation = () => {
  if (simTimer) {
    clearInterval(simTimer);
    simTimer = null;
  }
};
