import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
// Add your imports here
import Login from "pages/Login";
import MainAnalyticsOverviewDashboard from "pages/main-analytics-overview-dashboard";
import AppointmentManagementDashboard from "pages/appointment-management-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/" element={<Navigate to="/main-analytics-overview-dashboard" replace />} />
        <Route path="/main-analytics-overview-dashboard" element={
          <ProtectedRoute>
            <MainAnalyticsOverviewDashboard />
          </ProtectedRoute>
        } />
        <Route path="/appointment-management-dashboard" element={
          <ProtectedRoute>
            <AppointmentManagementDashboard />
          </ProtectedRoute>
        } />
        
        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;