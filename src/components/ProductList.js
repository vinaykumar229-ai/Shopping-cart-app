import React from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const ProductList = ({ cart, setCart }) => {
  return (
    <div className="product-list">
      {PRODUCTS.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cart={cart}
          setCart={setCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
