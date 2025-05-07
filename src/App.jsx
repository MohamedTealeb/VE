import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Modules/Home/Home";
import Product from "./Modules/Home/Product/Product";
import Login from "./Modules/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
