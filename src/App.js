import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Assigned from "./Components/Assigned/Assigned";
import Reports from "./Components/Reports/Reports";
import Priority from "./Components/Priority/Priority";
import Pending from "./Components/Pending/Pending";
import Notification from "./Components/Notification/Notification";
import Settings from "./Components/Settings/Settings";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Assigned" element={<Assigned />} />
        <Route path="/Reports" element={<Reports />} />
        <Route path="/Priority" element={<Priority />} />
        <Route path="/Pending" element={<Pending />} />
        <Route path="/Notification" element={<Notification />} />
        <Route path="/Settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
