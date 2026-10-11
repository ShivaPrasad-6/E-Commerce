import { formatPrice, formatDate } from "../../utils/formatting";
import "./checkout.css";


export function OrderSummary({ cartItems, deliveryOption, handleDeliveryChange, selectedDeliveryOption }) {
  return (
    <>
      <div className="order-summary">
        {cartItems.map((item) => {
          return (
            <div className="cart-item-container" key={item.productId}>
              <div className="delivery-date">
                Delivery date:
                {selectedDeliveryOption(deliveryOption, item)
                  ?.estimatedDeliveryTimeMs
                  ? formatDate(
                      selectedDeliveryOption(deliveryOption, item)
                        .estimatedDeliveryTimeMs,
                    )
                  : ""}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={item.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{item.product.name}</div>
                  <div className="product-price">
                    {formatPrice(item.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">{item.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>

                <div className="delivery-options">
                  <div className="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  {deliveryOption.map((option) => {
                    const shippingPrice =
                      option.priceCents === 0
                        ? "FREE Shipping"
                        : formatPrice(option.priceCents);
                    return (
                      <div key={option.id} className="delivery-option">
                        <input
                          type="radio"
                          checked={item.deliveryOptionId === option.id}
                          onChange={() =>
                            handleDeliveryChange(item.productId, option.id)
                          }
                          className="delivery-option-input"
                          name={`delivery-option-${item.productId}`}
                        />
                        <div>
                          <div className="delivery-option-date">
                            {formatDate(option.estimatedDeliveryTimeMs)}
                          </div>
                          <div className="delivery-option-price">
                            Shipping Charge:{shippingPrice}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
