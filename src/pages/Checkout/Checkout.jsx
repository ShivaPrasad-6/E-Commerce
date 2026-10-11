import { useState, useEffect } from 'react'
import axios from 'axios'
import './checkout.css'
import CheckoutHeader from '../../components/CheckoutHeader/CheckcoutHeader'
import { OrderSummary } from "./OrderSummary";
import { PaymentSummary } from "./PaymentSummary";
import cartFavicon from '../../assets/cart-favicon.png'

function Checkout( { cart } ) {

  console.log('Checkout component received cart:', cart); // Log the received cart prop
  const [cartItems, setCartItems] = useState(cart);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

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
        setDeliveryOptions(response.data); // Set the default delivery options
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
        <OrderSummary
          cartItems={cartItems}
          deliveryOptions={deliveryOptions}
          handleDeliveryChange={handleDeliveryChange}
          selectedDeliveryOption={selectedDeliveryOption}
        />
        <PaymentSummary paymentSummary={paymentSummary} />
      </div>
    </div>
    </>
  )
}
export default Checkout;