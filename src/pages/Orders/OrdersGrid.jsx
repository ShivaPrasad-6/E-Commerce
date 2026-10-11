import "./OrdersPage.css";
import { formatDate, formatPrice } from "../../utils/formatting";
import { OrderDetailsGrid } from "./OrderDetailsGrid";

export function OrdersGrid({ orders }) {
  return (
    <>
      <div className="orders-grid">
        {orders.map((order) => (
          <div className="order-container" key={order.id}>
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
                <OrderDetailsGrid product={product} key={product.productId} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
