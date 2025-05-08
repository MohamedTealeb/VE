import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Modules/Home/Home";
import Product from "./Modules/Product/Product";
import Login from "./Modules/Login/Login";
import Order from "./Modules/Order/Order";
import Users from "./Modules/Users/Users";
import Category from "./Modules/Category/Category";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
        <Route path="orders" element={<Order />} />
        <Route path="users" element={<Users />} />
        <Route path="Category" element={<Category />} />
      </Routes>
    </>
  );
}

export default App;
