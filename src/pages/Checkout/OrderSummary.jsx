import { formatPrice, formatDate } from "../../utils/formatting";
import "./checkout.css";

import { DeliveryOptions } from "./DeliveryOptions";
import { DeliveryDate } from "./DeliveryDate";

export function OrderSummary({ cartItems, deliveryOptions, handleDeliveryChange, selectedDeliveryOption }) {
  return (
    <>
      <div className="order-summary">
        {cartItems.map((cartItem) => { 
          return (
            <div className="cart-item-container" key={cartItem.productId}>

              <DeliveryDate 
                cartItem={cartItem} 
                selectedDeliveryOption={selectedDeliveryOption}
                deliveryOptions={deliveryOptions} 
              />



              <div className="cart-item-details-grid">
                <img className="product-image" src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
                  <div className="product-price">
                    {formatPrice(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity:{" "}
                      <span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
                      Delete
                    </span>
                  </div>
                </div>
                <DeliveryOptions 
                  handleDeliveryChange={handleDeliveryChange}
                  cartItem={cartItem} 
                  deliveryOptions={deliveryOptions}
                />

              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
