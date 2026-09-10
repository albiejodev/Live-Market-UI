import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

// Lazy load secondary pages
const Markets = lazy(() => import('./pages/Markets'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Signals = lazy(() => import('./pages/Signals'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full w-full">
    <div className="text-trade-text-secondary">Loading...</div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="markets" element={
            <Suspense fallback={<LoadingFallback />}>
              <Markets />
            </Suspense>
          } />
          <Route path="portfolio" element={
            <Suspense fallback={<LoadingFallback />}>
              <Portfolio />
            </Suspense>
          } />
          <Route path="signals" element={
            <Suspense fallback={<LoadingFallback />}>
              <Signals />
            </Suspense>
          } />
          
          {/* Placeholders for unused routes */}
          <Route path="analytics" element={<Navigate to="/" replace />} />
          <Route path="alerts" element={<Navigate to="/" replace />} />
          <Route path="settings" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
