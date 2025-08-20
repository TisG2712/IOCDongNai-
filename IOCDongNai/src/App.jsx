import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserGroupManagement from "./pages/System/UserGroupManagement";
import UserManagement from "./pages/System/UserManagement";
import SoftwareCategoryManagement from "./pages/System/SoftwareCategoryManagement";
import PermissonGroups from "./pages/System/PermissonGroups";
import { SidebarProvider } from "./components/ui/SidebarContext";
import Sidebar from "./components/ui/Sidebar";

function App() {
  return (
    <SidebarProvider>
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/user-group-management"
            element={<UserGroupManagement />}
          />
          <Route path="/user-management" element={<UserManagement />} />
          <Route
            path="/software-category"
            element={<SoftwareCategoryManagement />}
          />
          <Route path="/permission-groups" element={<PermissonGroups />} />
        </Routes>
      </Router>
    </SidebarProvider>
  );
}

export default App;
