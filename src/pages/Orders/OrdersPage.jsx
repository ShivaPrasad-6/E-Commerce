import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../../components/Header/Header";
import "./OrdersPage.css";
import {OrdersGrid} from "./OrdersGrid";
import ordersFavicon from "../../assets/orders-favicon.png";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the API when the component mounts
    axios
      .get("/api/orders?expand=products")
      .then((response) => {
        // Handle the response and set the orders state if needed
        console.log("Orders fetched:", response.data);
        setOrders(response.data); // Set the default orders
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" type="image/svg+xml" href={ordersFavicon} />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        <OrdersGrid orders={orders} />
      </div>
    </>
  );
}
