import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import UserHome from "./Components/User/Home/Home";
import UserNavbar from "./Components/User/Navbar/Navbar";
import UserAssigned from "./Components/User/Assigned/Assigned";
import UserReports from "./Components/User/Reports/Reports";
import UserPriority from "./Components/User/Priority/Priority";
import UserPending from "./Components/User/Pending/Pending";
import UserSettings from "./Components/User/Settings/Settings";
import UserNotification from "./Components/User/Notification/Notification";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="user/dashboard" />} />
        <Route path="user" element={<Outlet />}>
          <Route path="dashboard" element={<UserHome />} />
          <Route path="Navbar" element={<UserNavbar />} />
          <Route path="Assigned" element={<UserAssigned />} />
          <Route path="Reports" element={<UserReports />} />
          <Route path="Priority" element={<UserPriority />} />
          <Route path="Pending" element={<UserPending />} />
          <Route path="Notification" element={<UserNotification />} />
          <Route path="Settings" element={<UserSettings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
