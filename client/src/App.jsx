import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import UserPWA from './pages/UserPWA';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pwa" element={<UserPWA />} />
        {/* Default to PWA for testing, or a landing page. Using PWA as default for now. */}
        <Route path="/" element={<Navigate to="/pwa" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
