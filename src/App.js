import React, { useState } from "react";
import UserManagement from "./pages/UserManagement";
import RoleManagement from "./pages/RoleManagement";

const App = () => {
  const [currentPage, setCurrentPage] = useState("users");

  return (
    <div className="App">
      <nav>
        <button onClick={() => setCurrentPage("users")}>User Management</button>
        <button onClick={() => setCurrentPage("roles")}>Role Management</button>

      </nav>
      {currentPage === "users" ? <UserManagement /> : <RoleManagement />}
    </div>
  );
};



export default App;
