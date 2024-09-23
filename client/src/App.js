import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./App.css";

import Home from "./Pages/Home/Home";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Navbar from "./Components/Navbar";
import Template from "./Pages/Template/Template";
import Report from "./Pages/Report/Report";
import Shared from "./Pages/Shared/Shared";
import Notification from "./Pages/Notification/Notification";
import Tag from "./Pages/Tag/Tag";

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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            {" "}
          </Route>
          <Route path="Admin/Dashboard" element={<Dashboard />}>
            {" "}
          </Route>
          <Route path="/Navbar" element={<Navbar />}>
            {" "}
          </Route>
          <Route path="Template" element={<Template />}>
            {" "}
          </Route>
          <Route path="Reports" element={<Report />}></Route>
          <Route path="/shared-task" element={<Shared />}>
            {" "}
          </Route>
          <Route path="/notification" element={<Notification />}>
            {" "}
          </Route>
          <Route path="Tag" element={<Tag />}>
            {" "}
          </Route>
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
      </BrowserRouter>
    </>
  );
}

export default App;
