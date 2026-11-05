import axios from "axios";
import { formatPrice, formatDate } from "../../utils/formatting";
import "./checkout.css";

export function DeliveryOptions({
  handleDeliveryChange,
  cartItem,
  deliveryOptions,
  fetchCartItems,
}) {
  const updateDeliveryOption = async (deliveryOptionId) => {
    // Update the delivery option for the specific product in the cart
    try {
      await axios
        .put(`/api/cart-items/${cartItem.productId}`, {
          deliveryOptionId: deliveryOptionId,
        });
    } catch (error) {
      console.error("Error updating delivery option:", error);
    }
    handleDeliveryChange(cartItem.productId, deliveryOptionId); // Update the local state for demonstration purposes
    await fetchCartItems(); // Fetch the updated cart items
  };

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
            <div key={option.id} className="delivery-option" onClick={() => updateDeliveryOption(option.id)}>
              <input
                type="radio"
                checked={cartItem.deliveryOptionId === option.id}
                onChange={() => {}}
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
