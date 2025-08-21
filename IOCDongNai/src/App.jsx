import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserGroupManagement from "./pages/System/UserGroupManagement";
import UserManagement from "./pages/System/UserManagement";
import SoftwareCategoryManagement from "./pages/System/SoftwareCategoryManagement";
import OrganizationTypeManagement from "./pages/System/OrganizationTypeManagement";
import DepartmentCategoryManagement from "./pages/System/DepartmentCategoryManagement";
import PermissonGroups from "./pages/System/PermissonGroups";
import DepartmentInforManagement from "./pages/System/DepartmentInforManagement";
import UnitCategoryManagement from "./pages/System/UnitCategoryManagement";
import EthnicCategoryManagement from "./pages/System/EthnicCategoryManagement";
import OfficerGroupManagement from "./pages/System/OfficerGroupManagement";
import OfficerManagement from "./pages/System/OfficerManagement";
import SystemParameterGroupManagement from "./pages/System/SystemParameterGroupManagement";
import SystemParameterManagement from "./pages/System/SystemParameterManagement";
import SoftwareFunctionGroupManagement from "./pages/System/SoftwareFunctionGroupManagement";
import SoftwareFunctionManagement from "./pages/System/SoftwareFunctionManagement";
import NotificationGroupManagement from "./pages/System/NotificationGroupManagement";
import { SidebarProvider } from "./components/ui/SidebarContext";
import Sidebar from "./components/ui/Sidebar";
import NotificationManagement from "./pages/System/NotificationManagement";
import AccessLogManagement from "./pages/System/AccessLogManagement";
import PasswordPolicies from "./pages/System/PasswordPoliciesManagement";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import AccessLogDashboard from "./pages/System/AccessLogDashboard";

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <Routes>
            {/* Route công khai - Login */}
            <Route path="/" element={<Login />} />

            {/* Route được bảo vệ - cần đăng nhập */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-group-management"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <UserGroupManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/user-management"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/software-category"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <SoftwareCategoryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/organization-types-category"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <OrganizationTypeManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/department-category"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <DepartmentCategoryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/permission-groups"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <PermissonGroups />
                </ProtectedRoute>
              }
            />
            <Route
              path="/department-information"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <DepartmentInforManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/unit-category"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <UnitCategoryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ethnic-category"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <EthnicCategoryManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer-group"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <OfficerGroupManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/officer"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <OfficerManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/system-parameter-group"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <SystemParameterGroupManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/system-parameter"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <SystemParameterManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/software-function-group"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <SoftwareFunctionGroupManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/software-function"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <SoftwareFunctionManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification-group"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <NotificationGroupManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <NotificationManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/access-log"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <AccessLogManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password-policies"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <PasswordPolicies />
                </ProtectedRoute>
              }
            />
            <Route
              path="/access-log-dashboard"
              element={
                <ProtectedRoute>
                  <Sidebar />
                  <AccessLogDashboard />
                </ProtectedRoute>
              }
            />

            {/* Redirect tất cả route không hợp lệ về dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
