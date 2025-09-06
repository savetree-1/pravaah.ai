import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Dashboard } from './pages/Dashboard';
import { Upload } from './pages/Upload';
import { DocumentView } from './pages/DocumentView';
import { QCEditor } from './pages/QCEditor';
import { Connectors } from './pages/Connectors';
import { Audit } from './pages/Audit';
import './index.css';

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/document/:id" element={<DocumentView />} />
          <Route path="/qc" element={<QCEditor />} />
          <Route path="/connectors" element={<Connectors />} />
          <Route path="/audit" element={<Audit />} />
        </Routes>
      </AppShell>
    </Router>
  );
}

export default App;
