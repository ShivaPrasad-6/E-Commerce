import axios from "axios";
import { useState, useEffect } from "react";

import HomePage from './pages/HomePage/HomePage'
import Checkout from './pages/Checkout/Checkout' 
import {OrdersPage} from './pages/Orders/OrdersPage' 
import Tracking from './pages/Tracking/Tracking'

import { Routes, Route } from 'react-router'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);
   const fetchCartItems = async () => {
      try {
        const response = await axios.get("/api/cart-items?expand=product");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
  useEffect(() => {
    fetchCartItems();
  }, [cart]);

  return (
    <Routes>
      <Route path="/" element={<HomePage cart={cart} fetchCartItems={fetchCartItems} />} />
      <Route path="/checkout" element={<Checkout cart={cart} />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/tracking" element={<Tracking />} />
    </Routes>
  )
}

export default App
