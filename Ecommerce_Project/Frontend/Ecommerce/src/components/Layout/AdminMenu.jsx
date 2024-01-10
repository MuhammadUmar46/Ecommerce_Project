import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h3 className="mb-2">Admin Panel</h3>
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/users" class="list-group-item list-group-item-action">
            Users
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
