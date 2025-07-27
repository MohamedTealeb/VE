import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Sidebar from "./Component/Shared/Sidebar";
import Home from "./Modules/Home/Home";
import Product from "./Modules/Product/Product";
import Login from "./Modules/Login/Login";
import Order from "./Modules/Order/Order";
import Users from "./Modules/Users/Users";
import Category from "./Modules/Category/Category";
import Offers from "./Modules/Messages/Messages";
import SimpleMessages from "./Modules/Messages/SimpleMessages";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  return (
    <>
      <Toaster />
      <div style={{ display: "flex" }}>
        {!isLogin && <Sidebar />}
        <div style={{ flex: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="login" element={<Login />} />

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
            <Route
              path="messages"
              element={
                <ProtectedRoute>
                  <Offers />
                </ProtectedRoute>
              }
            />
            <Route
              path="simple-messages"
              element={
                <ProtectedRoute>
                  <SimpleMessages />
                </ProtectedRoute>
              }
            />

            {/* Redirect any unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
