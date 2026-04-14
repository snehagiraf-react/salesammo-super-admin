import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardPage from './features/dashboard/DashboardPage';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Companies from './features/company/Companies';
import PackagesData from './features/packages/Packages';
import Revenue from './features/revenue/Revenue';

import './App.css';

/* =========================
   MAIN LAYOUT
========================= */
const MainLayout = () => {
  // Sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(() => window.innerWidth > 900);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 900);

  /* ---------- TOGGLE ---------- */
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  /* ---------- CLOSE SIDEBAR (PASSED TO SIDEBAR) ---------- */
  const closeSidebar = () => {
    if (window.innerWidth <= 900) {
      setSidebarOpen(false);
    }
  };

  /* ---------- HANDLE RESIZE ---------- */
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);

      if (mobile) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* SIDEBAR */}
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={closeSidebar}
      />

      {/* OVERLAY (MOBILE ONLY) */}
      {sidebarOpen && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <div className={`main-wrapper ${sidebarOpen ? '' : 'sidebar-closed'}`}>
        <Header onToggleSidebar={toggleSidebar} />

        <main className="main-content">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/packages" element={<PackagesData />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
          </Routes>
        </main>
      </div>
    </>
  );
};

/* =========================
   APP ROOT
========================= */
export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { fontSize: '1rem' },
        }}
      />

      <div className="App">
        <Routes>
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </div>
    </>
  );
}