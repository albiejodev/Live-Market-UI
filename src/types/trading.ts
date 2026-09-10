export interface TradeActivity {
  id: string;
  symbol: string;
  type: 'LONG' | 'SHORT' | 'BUY' | 'SELL';
  price: number;
  pnl: number; // percentage
  timestamp: number;
}

export interface TradingSignal {
  symbol: string;
  signal: 'LONG' | 'SHORT' | 'HOLD';
  confidence: number;
  entry?: number;
  target?: number;
  stopLoss?: number;
  timestamp: number;
}
