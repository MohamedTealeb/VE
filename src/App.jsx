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
import ForgotPassword from './Modules/ForgotPassword/ForgotPassword';
import ResetPassword from "./Modules/ResetPassword/ResetPassword";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="product"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route
          path="category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="orders"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />

        {/* Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

export default App;
