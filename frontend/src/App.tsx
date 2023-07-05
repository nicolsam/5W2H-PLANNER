import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from '@components/Menu';

import Companies from '@pages/Companies';
import StoreCompany from '@pages/Companies/Store';
import Dashboard from '@pages/Dashboard';
import Error404 from '@pages/Error/404';
import Login from '@pages/Login';

function App() {

  return (
    <div className="flex flex-row h-full w-full">
      <Menu />

      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth loginPath="/login">
              <Login />
            </RequireAuth>
          }
        />

        <Route path="/login" element={<Login />} errorElement={<Error404 />} />

        <Route
          path="/dasboard"
          element={
            <RequireAuth loginPath="/login">
              <Dashboard />
            </RequireAuth>
          }
          errorElement={<Error404 />}
        />

        <Route
          path="/companies"
          element={
            <RequireAuth loginPath="/login">
              <Companies />
            </RequireAuth>
          }
          errorElement={<Error404 />}
        />

        <Route
          path="/companies/store"
          element={
            <RequireAuth loginPath="/login">
              <StoreCompany />
            </RequireAuth>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App
