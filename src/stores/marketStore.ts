import { create } from 'zustand';
import type { MarketState, ConnectionStatus } from '../types/market';

export const useMarketStore = create<MarketState>((set) => ({
  tickers: {},
  selectedSymbol: 'BTCUSDT',
  connectionStatus: 'OFFLINE' as ConnectionStatus,
  isSimulation: false,

  setTicker: (symbol, ticker) =>
    set((state) => ({
      tickers: {
        ...state.tickers,
        [symbol]: { ...state.tickers[symbol], ...ticker } as any,
      },
    })),

  setTickers: (newTickers) =>
    set((state) => {
      const updatedTickers = { ...state.tickers };
      let hasChanges = false;
      
      Object.entries(newTickers).forEach(([symbol, ticker]) => {
        if (ticker) {
          updatedTickers[symbol] = { ...updatedTickers[symbol], ...ticker } as any;
          hasChanges = true;
        }
      });
      
      return hasChanges ? { tickers: updatedTickers } : state;
    }),

  setSelectedSymbol: (symbol) => set({ selectedSymbol: symbol }),
  setConnectionStatus: (status) => set({ connectionStatus: status }),
  setSimulationMode: (isSimulation) => set({ isSimulation }),
}));
