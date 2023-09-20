import { RequireAuth } from 'react-auth-kit';
import { Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Menu from '@components/Menu';

import RequireAdminAccess from '@components/Authentication/Admin';
import Actions from '@pages/Action';
import EditAction from '@pages/Action/Edit';
import ShowAction from '@pages/Action/Show';
import StoreAction from '@pages/Action/Store';
import Companies from '@pages/Companies';
import EditCompany from '@pages/Companies/Edit';
import CompanyLogin from '@pages/Companies/Login';
import StoreCompany from '@pages/Companies/Store';
import Dashboard from '@pages/Dashboard';
import Forbidden from '@pages/Error/Forbidden';
import NotFound from '@pages/Error/NotFound';
import Goals from '@pages/Goals';
import EditGoal from '@pages/Goals/Edit';
import StoreGoal from '@pages/Goals/Store';
import Login from '@pages/Login';
import Responsibles from '@pages/Responsibles';
import EditResponsible from '@pages/Responsibles/Edit';
import ShowResponsible from '@pages/Responsibles/Show';
import StoreResponsible from '@pages/Responsibles/Store';
import EditStage from '@pages/Stage/Edit';
import ShowStage from '@pages/Stage/Show';
import StoreStage from '@pages/Stage/Store';

function App() {

  return (
    <div className="flex flex-row h-full w-full">
      <Menu />

      <Routes>
        <Route
          path="/"
          element={
            <CompanyLogin />
          }
        />

        <Route path="/admin/login" element={<Login />} />
        <Route path="/company/login" element={<CompanyLogin />} errorElement={<NotFound />} />

        <Route path="/forbidden" element={<Forbidden />} />

        <Route
          path="/dashboard"
          element={
            <RequireAuth loginPath="/company/login">
              <Dashboard />
            </RequireAuth>
          }
          errorElement={<NotFound />}
        />

        <Route
          path="/companies"
          element={
            <RequireAuth loginPath="/company/login">
              <RequireAdminAccess>
                <Companies />
              </RequireAdminAccess>
            </RequireAuth>
          }
          errorElement={<NotFound />}
        />

        <Route
          path="/companies/store"
          element={
            <RequireAuth loginPath="/company/login">
              <StoreCompany />
            </RequireAuth>
          }
        />
        
        <Route
          path="/companies/edit/:company_id"
          element={
            <RequireAuth loginPath="/company/login">
              <EditCompany />
            </RequireAuth>
          }
        />

        <Route
          path="/planning"
          element={
            <RequireAuth loginPath="/company/login">
              <Goals />
            </RequireAuth>
          }
          errorElement={<NotFound />}
        />

        <Route
          path="/planning/store"
          element={
            <RequireAuth loginPath="/company/login">
              <StoreGoal />
            </RequireAuth>
          }
        />
        
        <Route
          path="/planning/edit/:goal_id"
          element={
            <RequireAuth loginPath="/company/login">
              <EditGoal />
            </RequireAuth>
          }
        />
        
        <Route
          path="/planning/action/:goal_id"
          element={
            <RequireAuth loginPath="/company/login">
              <Actions />
            </RequireAuth>
          }
          errorElement={<NotFound />}
        />  

        <Route
          path="/planning/action/show/:action_id"
          element={
            <RequireAuth loginPath="/company/login">
              <ShowAction />
            </RequireAuth>
          }
        />

        <Route
          path="/planning/action/store"
          element={
            <RequireAuth loginPath="/company/login">
              <StoreAction />
            </RequireAuth>
          }
        />

        
        <Route
          path="/planning/action/edit/:action_id"
          element={
            <RequireAuth loginPath="/company/login">
              <EditAction />
            </RequireAuth>
          }
        />
        

        <Route
          path="/planning/stage/show/:stage_id"
          element={
            <RequireAuth loginPath="/company/login">
              <ShowStage />
            </RequireAuth>
          }
        />

        <Route
          path="/planning/stage/store"
          element={
            <RequireAuth loginPath="/company/login">
              <StoreStage />
            </RequireAuth>
          }
        />

        
        <Route
          path="/planning/stage/edit/:stage_id"
          element={
            <RequireAuth loginPath="/company/login">
              <EditStage />
            </RequireAuth>
          }
        />

        <Route
          path="/responsibles"
          element={
            <RequireAuth loginPath="/company/login">
              <Responsibles />
            </RequireAuth>
          }
          errorElement={<NotFound />}
        />
      
        <Route
          path="/responsibles/:responsible_id"
          element={
            <RequireAuth loginPath="/company/login">
              <ShowResponsible />
            </RequireAuth>
          }
          errorElement={<NotFound />}
        />
        <Route
          path="/responsibles/store"
          element={
            <RequireAuth loginPath="/company/login">
              <StoreResponsible />
            </RequireAuth>
          }
        />
        
        <Route
          path="/responsibles/edit/:responsible_id"
          element={
            <RequireAuth loginPath="/company/login">
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
