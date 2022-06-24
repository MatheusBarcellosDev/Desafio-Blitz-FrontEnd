import React, { useContext } from "react";

import { AuthContext } from "../context/auth";

export function DashboardTasks() {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>DashboardTasks</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
