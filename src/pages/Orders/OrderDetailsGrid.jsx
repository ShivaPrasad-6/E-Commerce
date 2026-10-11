import { formatDate } from "../../utils/formatting";
import "./OrdersPage.css";

export function OrderDetailsGrid({ product }) {
  return (
    <div className="order-details-grid" key={product.productId}>
      <div className="product-image-container">
        <img src={product.product.image} alt={product.product.name} />
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
  );
}
