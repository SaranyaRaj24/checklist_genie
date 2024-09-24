import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";


import './App.css';
import AdminHome from './Pages/admin/Home/Home';
import AdminDashboard from './Pages/admin/Dashboard/Dashboard';
import AdminNavbar from './Components/Navbar';
import AdminTemplate from './Pages/admin/Template/Template';
import AdminReport from './Pages/admin/Report/Report';
import AdminShared from './Pages/admin/Shared/Shared';
import AdminNotification from './Pages/admin/Notification/Notification';
import AdminTag from './Pages/admin/Tag/Tag';

import UserHome from "./Components/User/Home/Home";
import UserNavbar from "./Components/User/Navbar/Navbar";
import UserAssigned from "./Components/User/Assigned/Assigned";
import UserPriority from "./Components/User/Priority/Priority";
import UserPending from "./Components/User/Pending/Pending";
import UserSettings from "./Components/User/Settings/Settings";
import UserNotification from "./Components/User/Notification/Notification";

function App() {
  return (
    <> 
    <BrowserRouter>
  
    <Routes>
      <Route index element={<AdminHome/>}/>  
      <Route path='admin' element={<Outlet/>}>
      <Route path='dashboard' element={<AdminDashboard/>}/> 
      <Route path='navbar' element={<AdminNavbar/>}/> 
      <Route path='template' element={<AdminTemplate/>}/> 
      <Route path='reports' element={<AdminReport/>}/>
      <Route path='shared-task' element={<AdminShared/>}/> 
      <Route path='notification' element={<AdminNotification/>}/>  
      <Route path='tag' element={<AdminTag/>}/> 
      </Route>
    
          <Route path="user" element={<Outlet />}>
            <Route path="dashboard" element={<UserHome />} />
            <Route path="Navbar" element={<UserNavbar />} />
            <Route path="Assigned" element={<UserAssigned />} />
            <Route path="Priority" element={<UserPriority />} />
            <Route path="Pending" element={<UserPending />} />
            <Route path="Notification" element={<UserNotification />} />
            <Route path="Settings" element={<UserSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
