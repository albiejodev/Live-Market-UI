import { useMarketStore } from '../../stores/marketStore';
import type { MarketTicker } from '../../types/market';

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';
const SYMBOLS = ['btcusdt', 'ethusdt', 'solusdt', 'xrpusdt', 'avaxusdt'];

let ws: WebSocket | null = null;
let reconnectTimer: number | null = null;
let isIntentionallyClosed = false;

// Throttling setup
let updateBuffer: Record<string, Partial<MarketTicker>> = {};
let throttleTimer: number | null = null;
const THROTTLE_MS = 1000; // Update UI every 1s for dashboard performance

export const connectBinanceWS = () => {
  if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) {
    return;
  }

  isIntentionallyClosed = false;
  const store = useMarketStore.getState();
  store.setConnectionStatus('CONNECTING');

  const streams = SYMBOLS.map((s) => `${s}@ticker`).join('/');
  ws = new WebSocket(`${BINANCE_WS_URL}/${streams}`);

  ws.onopen = () => {
    store.setConnectionStatus('LIVE');
    if (reconnectTimer) {
      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    }
    
    if (!throttleTimer) {
      throttleTimer = window.setInterval(() => {
        if (Object.keys(updateBuffer).length > 0) {
          useMarketStore.getState().setTickers(updateBuffer);
          updateBuffer = {};
        }
      }, THROTTLE_MS);
    }
  };

  ws.onmessage = (event) => {
    if (store.isSimulation) return; // Ignore real data if simulated

    try {
      const data = JSON.parse(event.data);
      if (data.e === '24hrTicker') {
        const symbol = data.s;
        updateBuffer[symbol] = {
          symbol,
          price: parseFloat(data.c),
          change24h: parseFloat(data.p),
          changePercent24h: parseFloat(data.P),
          high24h: parseFloat(data.h),
          low24h: parseFloat(data.l),
          volume24h: parseFloat(data.v),
        };
      }
    } catch (e) {
      console.error('Error parsing WS message', e);
    }
  };

  ws.onclose = () => {
    if (!isIntentionallyClosed) {
      store.setConnectionStatus('RECONNECTING');
      reconnectTimer = window.setTimeout(connectBinanceWS, 3000);
    } else {
      store.setConnectionStatus('OFFLINE');
    }
    ws = null;
    if (throttleTimer) {
      clearInterval(throttleTimer);
      throttleTimer = null;
    }
  };

  ws.onerror = () => {
    ws?.close();
  };
};

export const disconnectBinanceWS = () => {
  isIntentionallyClosed = true;
  if (ws) {
    ws.close();
    ws = null;
  }
  if (throttleTimer) {
    clearInterval(throttleTimer);
    throttleTimer = null;
  }
  useMarketStore.getState().setConnectionStatus('OFFLINE');
};
