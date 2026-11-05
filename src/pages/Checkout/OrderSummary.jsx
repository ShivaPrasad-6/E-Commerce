import "./checkout.css";

import { DeliveryOptions } from "./DeliveryOptions";
import { DeliveryDate } from "./DeliveryDate";
import { OrderDetails } from "./OrderDetails";

export function OrderSummary({ cartItems, deliveryOptions, handleDeliveryChange, selectedDeliveryOption, fetchCartItems }) {
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
                <OrderDetails cartItem={cartItem} fetchCartItems={fetchCartItems} />

                <DeliveryOptions 
                  handleDeliveryChange={handleDeliveryChange}
                  cartItem={cartItem} 
                  deliveryOptions={deliveryOptions}
                  fetchCartItems={fetchCartItems}
                />

              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
