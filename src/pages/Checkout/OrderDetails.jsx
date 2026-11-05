import axios from "axios";
import "./checkout.css";
import { formatPrice } from "../../utils/formatting";

export function OrderDetails({cartItem, fetchCartItems}) {

  const deleteCartItem = async (productId) => {
    try {
      await axios.delete(`/api/cart-items/${productId}`);
      await fetchCartItems(); // Fetch the updated cart items
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }}

  return (
    <>
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
          <span className="update-quantity-link link-primary">Update</span>
          <span className="delete-quantity-link link-primary" onClick={() => deleteCartItem(cartItem.productId)}>
            Delete
          </span>
        </div>
      </div>
    </>
  );
}
