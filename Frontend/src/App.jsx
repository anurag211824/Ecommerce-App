import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import ShopContextProvider from "./context/ShopContext.jsx";
import Footer from "./components/Footer.jsx";
import SerachBar from "./components/SerachBar.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Myprofile from "./pages/Myprofile.jsx";

const App = () => {
  return (
    <ShopContextProvider> {/* Provide shop context to the app */}
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer /> {/* Container for toast notifications */}
        <Navbar /> {/* Navigation bar */}
        <SerachBar /> {/* Search bar component */}
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/myprofile" element={<Myprofile />} />
        </Routes>
        <Footer /> {/* Footer component */}
      </div>
    </ShopContextProvider>
  );
};

export default App;
