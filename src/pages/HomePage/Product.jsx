import { useState } from "react";
import axios from "axios";
import { formatPrice } from "../../utils/formatting";

export function Product({ product, fetchCartItems }) {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  }

  const handleAddToCart = async (productId) => {
    try {
      await axios.post("/api/cart-items", {
        productId: productId,
        quantity: quantity,
      });
      fetchCartItems();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="product-container" key={product.id}>
      <div className="product-image-container">
        <img className="product-image" src={product.image}
         data-testid="product-image"/>
      </div>
      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>
      <div className="product-rating-container">
        <img
          className="product-rating-stars"
          src={`images/ratings/rating-${product.rating.stars * 10}.png`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>
      <div className="product-price">{formatPrice(product.priceCents)}</div>
      <div className="product-quantity-container">
        <select value={quantity} onChange={handleQuantityChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>

      <div className="added-to-cart" style={{ display: "none" }}>
        <img src="images/icons/checkmark.png" />
        Added 
      </div>

      <button className="add-to-cart-button button-primary"
        onClick={() => handleAddToCart(product.id)}>
        Add to Cart
      </button>
    </div>
  );
}
