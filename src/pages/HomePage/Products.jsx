import { useEffect, useState } from "react";
import axios from "axios";
import { formatPrice } from "../../utils/formatting";
import "./HomePage.css";

import { Product } from "./Product";


export function Products({ fetchCartItems }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // fetch('http://localhost:3000/api/products')
    //   .then((response) => {
    //     return response.json();
    //   }).then((data) => {
    //     console.log(data)
    //     setProducts(data);
    //   }).catch((error) => {
    //     console.error('Error fetching products:', error);
    //   });

    // axios
    //   .get("/api/products")
    //   .then((response) => {
    //     setProducts(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching products:", error);
    //   });
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="products-grid">
      {products.map((product) => (
        <Product product={product} key={product.id} fetchCartItems={fetchCartItems} />
      ))}
    </div>
  );
}
