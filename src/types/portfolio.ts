export interface PortfolioAsset {
  symbol: string;
  quantity: number;
  averagePrice: number;
}

export interface PortfolioState {
  balance: number;
  holdings: PortfolioAsset[];
  
  // Actions
  buyAsset: (symbol: string, quantity: number, price: number) => void;
  sellAsset: (symbol: string, quantity: number, price: number) => void;
}
