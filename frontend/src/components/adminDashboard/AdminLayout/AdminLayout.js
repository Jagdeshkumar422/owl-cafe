import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  useEffect(()=>{
    if (!isAuthenticated) {
      window.location.href ="/login"; // Redirect to login if not authenticated
    }
  })
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    // Redirect logic can be added here if needed
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-menu">
          <NavLink to="/admin/addcategory" className="admin-link">
            Add Category
          </NavLink>
          <NavLink to="/admin/addmenu" className="admin-link">
            Add Menu
          </NavLink>
          
          {/* Uncomment if you want more links */}
          <NavLink to="/admin/addbanner" className="admin-link">
            Add Banner
          </NavLink>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="admin-content">{children}</div>
    </div>
  );
};

export default AdminLayout;
