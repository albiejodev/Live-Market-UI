# TradeVision - Crypto Trading Dashboard

TradeVision is a professional-grade, dark-themed cryptocurrency trading dashboard built with React and TypeScript.

## Architecture Overview

- **Frontend Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (v4) with a custom `trade-` theme for financial UI consistency.
- **State Management**: Zustand
  - `marketStore`: Manages real-time ticker prices, WS connections, and simulation mode.
  - `portfolioStore`: Manages simulated asset holdings and balances.
  - `settingsStore`: Manages global dashboard preferences.
- **Charts**:
  - `recharts` for Area, Bar, and Donut charts.
  - `lightweight-charts` by TradingView for the high-performance candlestick trading chart.
- **Data Source**:
  - Live data from Binance WebSocket (`wss://stream.binance.com:9443/ws`).
  - Simulation Mode: A built-in deterministic simulator for off-grid development and testing.

## How to Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## Features

- **Live Market Data**: Subscribes to Binance WebSockets to stream live ticker updates.
- **Simulation Mode**: Fallback to random-walk price simulation when offline or manually enabled.
- **Responsive Layout**: Adapts gracefully to desktop, tablet, and mobile viewing.
- **Performance Optimized**: Uses Zustand for atomic state updates and custom React hooks to avoid unnecessary re-renders.

## Environment Variables

No environment variables are required to run this project in its current state as it relies entirely on public APIs and client-side simulation.

## Technical Decisions

- **Why Zustand?**: Zustand avoids the boilerplate of Redux while providing a cleaner API than React Context for high-frequency updates like live market data, reducing unnecessary re-renders.
- **Why Lightweight Charts?**: Standard SVG-based charting libraries like Recharts struggle with thousands of data points commonly found in trading views. Lightweight-charts uses HTML5 Canvas to provide buttery smooth 60fps scrolling and zooming for candlestick data.
