import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './components/layout/Dashboard';
import Stock from './pages/Stock';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard><Stock /></Dashboard>} />
        <Route path="/home" element={<Dashboard><Home /></Dashboard>} />
        <Route path="/contact" element={<div>Contact Form</div>} />
        <Route path="*" element={<div>404</div>} /> {/* Catch-all for 404 */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
