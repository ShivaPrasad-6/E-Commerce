import Header from "../../components/Header/Header";
import "./HomePage.css";
import homeFavicon from "../../assets/home-favicon.png";
import { Products } from "./Products";

function HomePage( { cart, fetchCartItems } ) {

  return (
    <>
      <title>Ecommerce Project</title>
      <link rel="icon" type="image/svg+xml" href={homeFavicon} />

      <Header cart={cart} />
      <div className="home-page">
        <Products fetchCartItems={fetchCartItems} />
      </div>
    </>
  );
}

export default HomePage;
