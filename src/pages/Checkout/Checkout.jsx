import { useState, useEffect } from 'react'
import date from 'dayjs'
import axios from 'axios'
import './checkout.css'
import CheckoutHeader from '../../components/CheckoutHeader/CheckcoutHeader'
import cartFavicon from '../../assets/cart-favicon.png'
import { formatPrice, formatDate, cartQuantity } from '../../utils/formatting'

function Checkout( { cart } ) {

  console.log('Checkout component received cart:', cart); // Log the received cart prop
  const [cartItems, setCartItems] = useState(cart);
  const [deliveryOption, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  const cartQuantityValue = cartQuantity(cart);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  useEffect(() => {
    // Fetch cart items from the API when the component mounts
    axios
      .get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((response) => {
        // Handle the response and set the delivery options state if needed
        console.log('Delivery options fetched:', response.data);
        setDeliveryOption(response.data); // Set the default delivery option
      })
      .catch((error) => {
        console.error('Error fetching delivery options:', error);
      });

    axios
      .get('/api/payment-summary')
      .then((response) => {
        // Handle the response and set the payment summary state if needed
        console.log('Payment summary fetched:', response.data);
        setPaymentSummary(response.data); // Set the default payment summary
      })
      .catch((error) => {
        console.error('Error fetching payment summary:', error);
      });
  }, [])

  const selectedDeliveryOption = (deliveryOption, item) => {
    if (!deliveryOption || !Array.isArray(deliveryOption)) {
      return null; // Return null if deliveryOption is not an array
    } 
    return deliveryOption.find(option => option.id === item.deliveryOptionId)
  };

  const handleDeliveryChange = (productId, selectedOptionId) => {
    // Update the delivery option for the specific product in the cart
    const updatedCart = cartItems.map(item => {
      if (item.productId === productId) {
        return { ...item, deliveryOptionId: selectedOptionId };
      }
      return item;
    });

    setCartItems(updatedCart); // Update the local state for demonstration purposes
  };

  return (
    <>  
    <title>Checkout</title>
    <link rel="icon" type="image/svg+xml" href={cartFavicon} />
    <CheckoutHeader cart={cartItems} />

    <div className="checkout-page">
      <div className="page-title">Review your order</div>

      <div className="checkout-grid">
        <div className="order-summary">
          {cartItems.map((item) => {
            return (
              <div className="cart-item-container" key={item.productId}>
            <div className="delivery-date">
              Delivery date: {selectedDeliveryOption(deliveryOption, item)?.estimatedDeliveryTimeMs ? formatDate(selectedDeliveryOption(deliveryOption, item).estimatedDeliveryTimeMs) : ''}
            </div>

            <div className="cart-item-details-grid">
              <img className="product-image"
                src={item.product.image} />

              <div className="cart-item-details">
                <div className="product-name">
                  {item.product.name}
                </div>
                <div className="product-price">
                  {formatPrice(item.product.priceCents)}
                </div>
                <div className="product-quantity">
                  <span>
                    Quantity: <span className="quantity-label">{item.quantity}</span>
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
                  const shippingPrice = option.priceCents === 0 ? 'FREE Shipping' : formatPrice(option.priceCents);
                  return (
                    <div key={option.id} className="delivery-option">
                      <input
                        type="radio"
                        checked = {item.deliveryOptionId === option.id}
                        onChange={() => handleDeliveryChange(item.productId, option.id)}
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

        <div className="payment-summary">
            <div className="payment-summary-title">
              Payment Summary
            </div>
            { paymentSummary && (
              <>
                <div className="payment-summary-row">
                  <div>Items {paymentSummary.totalItems}:</div>
                  <div className="payment-summary-money">{formatPrice(paymentSummary.productCostCents)}</div>
                </div>
                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">{formatPrice(paymentSummary.shippingCostCents)}</div>
                </div>
                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">{formatPrice(paymentSummary.totalCostBeforeTaxCents)}</div>
                </div>
                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">{formatPrice(paymentSummary.taxCents)}</div>
                </div>
                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">{formatPrice(paymentSummary.totalCostCents)}</div>
                </div>
                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
        </div>
      </div>
    </div>
    </>
  )
}
export default Checkout;