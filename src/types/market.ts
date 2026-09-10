export interface MarketTicker {
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  high24h: number;
  low24h: number;
  volume24h: number;
  sparkline: number[];
}

export interface Candle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type ConnectionStatus = 'OFFLINE' | 'CONNECTING' | 'LIVE' | 'RECONNECTING';

export interface MarketState {
  tickers: Record<string, MarketTicker>;
  selectedSymbol: string;
  connectionStatus: ConnectionStatus;
  isSimulation: boolean;
  
  // Actions
  setTicker: (symbol: string, ticker: Partial<MarketTicker>) => void;
  setTickers: (tickers: Record<string, Partial<MarketTicker>>) => void;
  setSelectedSymbol: (symbol: string) => void;
  setConnectionStatus: (status: ConnectionStatus) => void;
  setSimulationMode: (isSimulation: boolean) => void;
}
