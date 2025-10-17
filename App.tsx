import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

const HomePage = lazy(() => import('./pages/HomePage'));
const ResonatorsPage = lazy(() => import('./pages/ResonatorsPage'));
const WeaponsPage = lazy(() => import('./pages/WeaponsPage'));
const EchosPage = lazy(() => import('./pages/EchosPage'));
const SimulatorPage = lazy(() => import('./pages/SimulatorPage'));
const BuildsPage = lazy(() => import('./pages/BuildsPage'));
const AnalyzerPage = lazy(() => import('./pages/AnalyzerPage'));

const LoadingFallback: React.FC = () => (
    <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gold"></div>
    </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resonators" element={<ResonatorsPage />} />
            <Route path="/weapons" element={<WeaponsPage />} />
            <Route path="/echos" element={<EchosPage />} />
            <Route path="/simulator" element={<SimulatorPage />} />
            <Route path="/builds" element={<BuildsPage />} />
            <Route path="/analyzer" element={<AnalyzerPage />} />
          </Routes>
        </Suspense>
      </Layout>
    </HashRouter>
  );
};

export default App;