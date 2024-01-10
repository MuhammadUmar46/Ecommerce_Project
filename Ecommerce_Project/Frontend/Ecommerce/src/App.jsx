import React from "react";
import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute"
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Category from "./pages/user/Category";
import Product from "./pages/user/Product";
import Products from "./pages/user/Products";
import UpdateProduct from "./pages/user/UpdateProduct";
import Checkout from "./pages/Checkout";



function App() {
  return (
    <>
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/about" element={<About />} />
       <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashboard />} />
        <Route path="user/orders" element={<Orders />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/category" element={<Category />} />
        <Route path="user/product" element={<Product />} />
        <Route path="user/product/:slug" element={<UpdateProduct />} />
        <Route path="user/products" element={<Products />} />

       </Route>
       <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />}/>
          <Route path="admin/users" element={<Users />} />
       </Route>
       <Route path="/register" element={<Register />} />
       <Route path="/login" element={<Login />}/>
       <Route path="/cart" element={<Cart />} />
       <Route path="/checkout" element={<Checkout /> } />
       <Route path="*" element={<NotFound />} />
     </Routes>
    </>
  );
}

export default App;
