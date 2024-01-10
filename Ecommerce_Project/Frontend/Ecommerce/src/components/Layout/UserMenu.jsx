import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <div className="text-center">
        <div className="list-group">
          <h4 className='mb-2'>Dashboard</h4>
          <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">
            Profile
          </NavLink>
          <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">
            Orders
          </NavLink>
          <NavLink to="/dashboard/user/category" className="list-group-item list-group-item-action">
            Create Category
          </NavLink>
          <NavLink to="/dashboard/user/product" className="list-group-item list-group-item-action">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/user/products" className="list-group-item list-group-item-action">
            Product
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default UserMenu