import React from 'react';
import ReactDOM from 'react-dom/client';

import './main.css';

import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-auth-kit';

import { GlobalProvider } from '@contexts/Provider';

import App from './App';

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "list" },
          style: {
            backgroundColor: '#444344',
            justifyContent: 'space-between',
            padding: "1rem",
            zIndex: "10"
          }
        },
        {
          props: { variant: "create" },
          style: {
            backgroundColor: '#585858',
            color: 'white',
            padding: "1rem",
            "&:hover": {
              backgroundColor: '#444344',
            }
          }
        }
      ]
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider 
          authType='cookie'
          authName='_auth'
          cookieDomain={window.location.hostname}
          cookieSecure={window.location.protocol === 'https'}
        >
            <BrowserRouter>
              <App />
            </BrowserRouter> 
        </AuthProvider>
      </ThemeProvider>
    </GlobalProvider>
  </React.StrictMode>,
)
