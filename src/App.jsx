import React from 'react';
import Routes from './Routes';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ThemeTransitionOverlay from './components/ui/ThemeTransitionOverlay';
import './styles/theme.css'; // Import the global theme styles

function AppContent() {
  const { theme, isTransitioning } = useTheme();

  return (
    <>
      <Routes />
      <ThemeTransitionOverlay isTransitioning={isTransitioning} theme={theme} />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
