import React from 'react';
import ReactDOM from 'react-dom/client';

import './main.css';

import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from 'react-auth-kit';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/en-gb';

import { GlobalProvider } from '@contexts/Provider';

import App from './App';

const theme = createTheme({
  palette: {
    text: {
      disabled: '#444344',
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'list' },
          style: {
            backgroundColor: '#444344',
            justifyContent: 'space-between',
            padding: '1rem',
            zIndex: '10',
          },
        },
        {
          props: { variant: 'main' },
          style: {
            backgroundColor: '#585858',
            color: 'white',
            padding: '1rem',
            '&:hover': {
              backgroundColor: '#444344',
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            backgroundColor: '#585858',
            color: 'white',
            padding: '.5rem 1rem',
            '&:hover': {
              backgroundColor: '#444344',
            },
          },
        },
        {
          props: { variant: 'action' },
          style: {
            backgroundColor: '#444344',
            color: 'white',
            padding: '.7rem',
            '&:hover': {
              backgroundColor: '#343434',
            },
          },
        },
      ],
    },
  },
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
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
              <BrowserRouter>
                <App />
              </BrowserRouter> 
            </LocalizationProvider>
          </AuthProvider>
        </ThemeProvider>
      </GlobalProvider>
  </React.StrictMode>,
)
