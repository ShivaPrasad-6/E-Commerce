import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const openOrders = () => {
    navigate('/orders');
  };

  const openHomePage = () => {
    navigate('/');
  };

  const openCheckout = () => {
    navigate('/checkout');
  }

  return (
    <>
      <div className="header">
        <div className="left-section">
          <a
            onClick={openHomePage}
            className="header-link"
          >
            <img className="logo" src="images/logo-white.png" />
            <img className="mobile-logo" src="images/mobile-logo-white.png" />
          </a>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" placeholder="Search" />

          <button className="search-button">
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <a
            className="orders-link header-link"
            onClick={openOrders}
          >
            <span className="orders-text">Orders</span>
          </a>

          <a
            className="cart-link header-link"
            onClick={openCheckout}
          >
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">3</div>
            <div className="cart-text">Cart</div>
          </a>
        </div>
      </div>
    </>
  );
}


export default Header;