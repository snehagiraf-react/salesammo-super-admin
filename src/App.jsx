import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardPage from './features/dashboard/DashboardPage';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Companies from './features/company/Companies';
import ViewCompanies from './features/company/ViewCompanies';
import ViewSubscriptionPlan from './features/subscription-plans/Viewsubscriptionplan';
import PackagesData from './features/plans/Plans';
import SubscriptionPlans from './features/subscription-plans/SubscriptionPlans';
import Revenue from './features/revenue/Revenue';
import ActivityLog from './features/activitylog/ActivityLog';
import Settings from './features/settings/Settings';
import ProtectedRoute from './features/auth/ProtectedRoute';
import Login from './pages/Login';
import {AuthProvider} from './features/auth/AuthProvider';


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
    
    <ProtectedRoute>

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
            <Route path="/companies/:id" element={<ViewCompanies />} />
            <Route path='/subscription-plans/:id' element={<ViewSubscriptionPlan />} />
            <Route path="/plans" element={<PackagesData />} />
            <Route path="/subscription-plans" element={<SubscriptionPlans />} />
            <Route path="/revenue" element={<Revenue />} />
            <Route path="/activitylog" element={<ActivityLog />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
          </Routes>
        </main>
      </div>
      </ProtectedRoute>
    </>
  );
};

/* =========================
   APP ROOT
========================= */
export default function App() {
  return (
    <AuthProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: { fontSize: '1rem' },
        }}
      />

      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </div>

      </AuthProvider>
  );
}