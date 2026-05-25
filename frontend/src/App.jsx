import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { DeploymentList } from './pages/DeploymentList';
import { DeploymentDetails } from './pages/DeploymentDetails';
import { DeploymentLogsViewer } from './pages/DeploymentLogsViewer';
import { WorkerStatusPanel } from './pages/WorkerStatusPanel';
import { SystemHealthOverview } from './pages/SystemHealthOverview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="deployments" element={<DeploymentList />} />
          <Route path="deployment/:id" element={<DeploymentDetails />} />
          <Route path="deployment/:id/logs" element={<DeploymentLogsViewer />} />
          <Route path="worker" element={<WorkerStatusPanel />} />
          <Route path="health" element={<SystemHealthOverview />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
