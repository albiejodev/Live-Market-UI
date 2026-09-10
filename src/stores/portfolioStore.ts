import { create } from 'zustand';
import type { PortfolioState } from '../types/portfolio';

// Initial mock holdings for simulation
const INITIAL_HOLDINGS = [
  { symbol: 'BTCUSDT', quantity: 0.5, averagePrice: 42000 },
  { symbol: 'ETHUSDT', quantity: 4.2, averagePrice: 2100 },
  { symbol: 'SOLUSDT', quantity: 50, averagePrice: 90 },
];

export const usePortfolioStore = create<PortfolioState>((set) => ({
  balance: 10000,
  holdings: INITIAL_HOLDINGS,

  buyAsset: (symbol, quantity, price) =>
    set((state) => {
      const cost = quantity * price;
      if (state.balance < cost) return state; // Insufficient funds

      const existingAsset = state.holdings.find((h) => h.symbol === symbol);
      let newHoldings;

      if (existingAsset) {
        newHoldings = state.holdings.map((h) => {
          if (h.symbol === symbol) {
            const newQuantity = h.quantity + quantity;
            const newAvgPrice =
              (h.quantity * h.averagePrice + cost) / newQuantity;
            return { ...h, quantity: newQuantity, averagePrice: newAvgPrice };
          }
          return h;
        });
      } else {
        newHoldings = [
          ...state.holdings,
          { symbol, quantity, averagePrice: price },
        ];
      }

      return { balance: state.balance - cost, holdings: newHoldings };
    }),

  sellAsset: (symbol, quantity, price) =>
    set((state) => {
      const existingAsset = state.holdings.find((h) => h.symbol === symbol);
      if (!existingAsset || existingAsset.quantity < quantity) return state; // Insufficient quantity

      const revenue = quantity * price;
      const newHoldings = state.holdings
        .map((h) => {
          if (h.symbol === symbol) {
            return { ...h, quantity: h.quantity - quantity };
          }
          return h;
        })
        .filter((h) => h.quantity > 0);

      return { balance: state.balance + revenue, holdings: newHoldings };
    }),
}));
