import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Modules/Home/Home";
import Product from "./Modules/Product/Product";
import Login from "./Modules/Login/Login";
import Order from "./Modules/Order/Order";
import Users from "./Modules/Users/Users";
import Category from "./Modules/Category/Category";
import Register from "./Modules/Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
     <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="product" element={<Product />} />
        

        {/* Redirect any unknown routes to home */}
        {/* <Route path='*' element={<Navigate to="login" replace />} /> */}
      </Routes>
    </>
  );
}

export default App;
