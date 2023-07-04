import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Companies from '@pages/Companies';
import Dashboard from '@pages/Dashboard';
import Error404 from '@pages/Error/404';
import Login from '@pages/Login';

function App() {

  return (
    <div className="App">
      Application
      <Routes>

        <Route path='/login' element={<Login />} />  

        <Route path='/dasboard' element={
            <RequireAuth loginPath='/login'>
              <Dashboard />
            </RequireAuth>
          } 
        />  
        <Route path='/companies' element={
            <RequireAuth loginPath='/login'>
              <Companies />
            </RequireAuth>
          }
        />  
        
      </Routes>      

      <ToastContainer />
    </div>
  )
}

export default App
