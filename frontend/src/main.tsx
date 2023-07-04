import React from 'react';
import ReactDOM from 'react-dom/client';

import './main.css';

import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-auth-kit';

import App from './App';

const theme = createTheme({
  
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider 
      authType='cookie'
      authName='_auth'
      cookieDomain={window.location.hostname}
      cookieSecure={window.location.protocol === 'https'}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter> 
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
)
