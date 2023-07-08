import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from '@components/Menu';

import Actions from '@pages/Action';
import EditAction from '@pages/Action/Edit';
import ShowAction from '@pages/Action/Show';
import StoreAction from '@pages/Action/Store';
import Companies from '@pages/Companies';
import EditCompany from '@pages/Companies/Edit';
import StoreCompany from '@pages/Companies/Store';
import Dashboard from '@pages/Dashboard';
import Error404 from '@pages/Error/404';
import Goals from '@pages/Goals';
import EditGoal from '@pages/Goals/Edit';
import StoreGoal from '@pages/Goals/Store';
import Login from '@pages/Login';
import Responsibles from '@pages/Responsibles';
import EditResponsible from '@pages/Responsibles/Edit';
import ShowResponsible from '@pages/Responsibles/Show';
import StoreResponsible from '@pages/Responsibles/Store';

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
        
        <Route
          path="/companies/edit/:company_id"
          element={
            <RequireAuth loginPath="/login">
              <EditCompany />
            </RequireAuth>
          }
        />

        <Route
          path="/planning"
          element={
            <RequireAuth loginPath="/login">
              <Goals />
            </RequireAuth>
          }
          errorElement={<Error404 />}
        />

        <Route
          path="/planning/store"
          element={
            <RequireAuth loginPath="/login">
              <StoreGoal />
            </RequireAuth>
          }
        />
        
        <Route
          path="/planning/edit/:goal_id"
          element={
            <RequireAuth loginPath="/login">
              <EditGoal />
            </RequireAuth>
          }
        />
        
        <Route
          path="/action/:goal_id"
          element={
            <RequireAuth loginPath="/login">
              <Actions />
            </RequireAuth>
          }
          errorElement={<Error404 />}
        />  
        
        <Route
          path="/action/show/:action_id"
          element={
            <RequireAuth loginPath="/login">
              <ShowAction />
            </RequireAuth>
          }
        />

        <Route
          path="/action/store"
          element={
            <RequireAuth loginPath="/login">
              <StoreAction />
            </RequireAuth>
          }
        />
        
        <Route
          path="/action/edit/:action_id"
          element={
            <RequireAuth loginPath="/login">
              <EditAction />
            </RequireAuth>
          }
        />
        
        <Route
          path="/responsibles"
          element={
            <RequireAuth loginPath="/login">
              <Responsibles />
            </RequireAuth>
          }
          errorElement={<Error404 />}
        />
      
        <Route
          path="/responsibles/:responsible_id"
          element={
            <RequireAuth loginPath="/login">
              <ShowResponsible />
            </RequireAuth>
          }
          errorElement={<Error404 />}
        />
        <Route
          path="/responsibles/store"
          element={
            <RequireAuth loginPath="/login">
              <StoreResponsible />
            </RequireAuth>
          }
        />
        
        <Route
          path="/responsibles/edit/:responsible_id"
          element={
            <RequireAuth loginPath="/login">
              <EditResponsible />
            </RequireAuth>
          }
        />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App
