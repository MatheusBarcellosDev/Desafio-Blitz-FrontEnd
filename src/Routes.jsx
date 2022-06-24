import React, { useContext } from "react";

import { Login } from "./pages/Login";
import { DashboardTasks } from "./pages/DashboardTasks";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider, AuthContext } from "./context/auth";

export function AppRoutes() {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/tasks"
            element={
              <Private>
                <DashboardTasks />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
