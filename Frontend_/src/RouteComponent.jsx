import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Component/Home";
import Login from "./Login/Login";
import Cart from "./Component/Cart";
import Product from "./Component/Product";
import About from "./Component/About";
import AllProduct from "./Component/AllProduct";
import Dashboard from "./Admin/Dashboard";
import AdminLogin from "./Admin/AdminLogin"
import AllObjects from './Admin/AllObjects'
import ProductCreate from "./Admin/ProductCreate";
import UpdateProduct from './Admin/UpdateProduct'
import Buy from "./Component/Buy";
import Orders from "./Component/Orders";
function RouteComponent() {
  const adminToken=localStorage.getItem("admin")
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/buy" element={<Buy/>}/>
        <Route path="/orders" element={<Orders/>}/>


        <Route path="/product" element={<AllProduct />} />
        <Route path="/product/:id" element={<Product />} />

        {/* admin routes  */}
        <Route path="/admin/dashboard" element={adminToken?<Dashboard />:<Navigate to='/admin/login'/>}/>
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/allObject" element={<AllObjects />} />
        <Route path="/admin/productCreate" element={<ProductCreate />} />
        <Route path="/admin/updateProduct/:id" element={<UpdateProduct />} />

      </Routes>
    </div>
  );
}

export default RouteComponent;
