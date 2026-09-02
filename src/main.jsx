import React from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import './styles.css';

const theme = createTheme({
  palette: {
    primary: { main: '#314baf' },
    secondary: { main: '#f49b44' },
    background: { default: '#f5f7fc' }
  },
  typography: { fontFamily: 'Inter, Arial, sans-serif' },
  shape: { borderRadius: 16 }
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode><ThemeProvider theme={theme}><CssBaseline /><App /></ThemeProvider></React.StrictMode>
);
