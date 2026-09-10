import { useEffect } from 'react';
import { useMarketStore } from '../stores/marketStore';
import { connectBinanceWS, disconnectBinanceWS } from '../services/binance/websocket';
import { startSimulation, stopSimulation } from '../services/simulation/marketSimulator';

export const useMarketData = () => {
  const isSimulation = useMarketStore((state) => state.isSimulation);

  useEffect(() => {
    if (isSimulation) {
      disconnectBinanceWS();
      startSimulation();
    } else {
      stopSimulation();
      connectBinanceWS();
    }

    return () => {
      // Don't disconnect on unmount of hook immediately if it's used globally, 
      // but if we want strict cleanup we can. Since it's a dashboard SPA, 
      // keeping WS open while mounted is good.
    };
  }, [isSimulation]);
};
