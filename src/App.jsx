import React from 'react';
import Routes from './Routes';
import { ThemeProvider } from './contexts/ThemeContext';
import './styles/theme.css'; // Import the global theme styles

function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
