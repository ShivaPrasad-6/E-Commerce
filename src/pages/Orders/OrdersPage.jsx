import { useState, useEffect } from "react";
import axios from "axios";
import { formatDate, formatPrice } from "../../utils/formatting";
import Header from "../../components/Header/Header";
import "./OrdersPage.css";
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

        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-container">
              <div className="order-header">
                <div className="order-header-left-section">
                  <div className="order-date">
                    <div className="order-header-label">Order Placed:</div>
                    <div>{formatDate(order.orderTimeMs)}</div>
                  </div>
                  <div className="order-total">
                    <div className="order-header-label">Total:</div>
                    <div>{formatPrice(order.totalCostCents)}</div>
                  </div>
                </div>

                <div className="order-header-right-section">
                  <div className="order-header-label">Order ID:</div>
                  <div>{order.id}</div>
                </div>
              </div>
              {order.products.map((product) => (
                <div className="order-details-grid">
                  <div className="product-image-container">
                    <img
                      src={product.product.image}
                      alt={product.product.name}
                    />
                  </div>

                  <div className="product-details">
                    <div className="product-name">{product.product.name}</div>
                    <div className="product-delivery-date">
                      Arriving on: {formatDate(product.estimatedDeliveryTimeMs)}
                    </div>
                    <div className="product-quantity">
                      Quantity: {product.quantity}
                    </div>
                    <button className="buy-again-button button-primary">
                      <img
                        className="buy-again-icon"
                        src="images/icons/buy-again.png"
                      />
                      <span className="buy-again-message">Add to Cart</span>
                    </button>
                  </div>

                  <div className="product-actions">
                    <a onClick={() => (window.location.href = "/tracking")}>
                      <button className="track-package-button button-secondary">
                        Track package
                      </button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
