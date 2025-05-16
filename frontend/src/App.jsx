import "./App.css";
import Home from "./screens/Home.jsx";
import Login from "./screens/Login.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Signup from "./components/Signup.jsx";
import { CartProvider } from "./components/ContextReducer.jsx";
import MyOrder from "./screens/MyOrder.jsx";
import AddDish from "./screens/AddDish.jsx";
import VendorOrders from "./screens/VendorOrders.jsx";

function App() {
  const userRole = localStorage.getItem("userRole");

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createuser" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/myOrder" element={<MyOrder />} />
          <Route exact path="/addDish" element={<AddDish></AddDish>} />
          <Route exact path="/vendorOrders" element={<VendorOrders />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
