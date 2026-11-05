import axios from "axios";
import {useNavigate} from "react-router";
import { formatPrice } from "../../utils/formatting";
import "./checkout.css";

export function PaymentSummary({ paymentSummary, fetchCartItems }) {
  const navigate = useNavigate();

  const createOrder = async () => {
    try {
      await axios.post("/api/orders",{paymentSummary}); // Send the payment summary to the server to create an order
      await fetchCartItems(); // Fetch the updated cart items
      navigate("/orders"); // Navigate to the orders page
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <>
      <div className="payment-summary">
        <div className="payment-summary-title">Payment Summary</div>
        {paymentSummary && (
          <>
            <div className="payment-summary-row">
              <div>Items {paymentSummary.totalItems}:</div>
              <div className="payment-summary-money">
                {formatPrice(paymentSummary.productCostCents)}
              </div>
            </div>
            <div className="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div className="payment-summary-money">
                {formatPrice(paymentSummary.shippingCostCents)}
              </div>
            </div>
            <div className="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div className="payment-summary-money">
                {formatPrice(paymentSummary.totalCostBeforeTaxCents)}
              </div>
            </div>
            <div className="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div className="payment-summary-money">
                {formatPrice(paymentSummary.taxCents)}
              </div>
            </div>
            <div className="payment-summary-row total-row">
              <div>Order total:</div>
              <div className="payment-summary-money">
                {formatPrice(paymentSummary.totalCostCents)}
              </div>
            </div>
            <button className="place-order-button button-primary"
              onClick={() => createOrder()}>
              Place your order
            </button>
          </>
        )}
      </div>
    </>
  );
}
