import { formatPrice, formatDate } from "../../utils/formatting";
import "./checkout.css";

export function DeliveryOptions({
  handleDeliveryChange,
  cartItem,
  deliveryOptions,
}) {
  return (
    <>
      <div className="delivery-options">
        <div className="delivery-options-title">Choose a delivery option:</div>
        {deliveryOptions.map((option) => {
          const shippingPrice =
            option.priceCents === 0
              ? "FREE Shipping"
              : formatPrice(option.priceCents);
          return (
            <div key={option.id} className="delivery-option">
              <input
                type="radio"
                checked={cartItem.deliveryOptionId === option.id}
                onChange={() => handleDeliveryChange(cartItem.productId, option.id)}
                className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`}
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
    </>
  );
}
