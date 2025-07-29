import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import MainAnalyticsOverviewDashboard from "pages/main-analytics-overview-dashboard";
import AppointmentManagementDashboard from "pages/appointment-management-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<MainAnalyticsOverviewDashboard />} />
        <Route path="/main-analytics-overview-dashboard" element={<MainAnalyticsOverviewDashboard />} />
        <Route path="/appointment-management-dashboard" element={<AppointmentManagementDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;