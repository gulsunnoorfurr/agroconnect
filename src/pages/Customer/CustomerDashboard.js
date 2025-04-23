// src/components/customer/CustomerDashboard.js

import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";

const CustomerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const approved = storedProducts.filter(
      (p) => p.status === "approved" && p.quantity > 0
    );
    setProducts(approved);
  }, []);

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => {
      const newQty = Math.max((prev[id] || 1) + change, 1);
      return { ...prev, [id]: newQty };
    });
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity > product.quantity) {
      alert("Quantity exceeds available stock!");
      return;
    }

    addToCart({
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity,
      image: product.image,
    });
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="container mt-4">
      {/* <h2>Welcome, {user?.username || "Customer"}</h2> */}
      <h4 className="mt-4">Available Products</h4>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              {product.image && (
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  height="200"
                  style={{ objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5>{product.name}</h5>
                <p>
                  <strong>Price:</strong> ₹{product.price}
                  <br />
                  <strong>Available:</strong> {product.quantity}{" "}
                  {product.quantityUnit}
                  <br />
                  <strong>Location:</strong> {product.location}
                </p>
                <div className="d-flex align-items-center mb-2">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="btn btn-secondary">
                    -
                  </button>
                  <span className="mx-3">{quantities[product.id] || 1}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="btn btn-secondary">
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="btn btn-success w-100">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
