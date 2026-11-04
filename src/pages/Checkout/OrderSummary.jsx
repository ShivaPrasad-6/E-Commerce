import "./checkout.css";

import { DeliveryOptions } from "./DeliveryOptions";
import { DeliveryDate } from "./DeliveryDate";
import { OrderDetails } from "./OrderDetails";

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
                <OrderDetails cartItem={cartItem} />

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
