// src/pages/Farmer/MyProducts.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(data);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
    }
  };

  const handleEdit = (product) => {
    navigate("/farmer/add-product", { state: { product } });
  };

  const handleSendForApproval = (productId) => {
    const updatedProducts = products.map((p) =>
      p.id === productId ? { ...p, status: "pending" } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="container mt-4">
      <h3>My Products</h3>
      <div className="row">
        {products.length === 0 ? (
          <p>No products yet.</p>
        ) : (
          products.map((prod) => (
            <div className="col-md-4 mb-4" key={prod.id}>
              <div className="card h-100 shadow-sm">
                {prod.image && (
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{prod.name}</h5>
                  <p className="card-text">
                    <strong>Price:</strong> ₹{prod.price}
                    <br />
                    <strong>Market Price:</strong> ₹{prod.marketPrice}
                    <br />
                    <strong>Quantity:</strong> {prod.quantity}kg
                    <br />
                    <strong>Location:</strong> {prod.location}
                    <br />
                    <strong>Description:</strong> {prod.description}
                  </p>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(prod)}>
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(prod.id)}>
                    Delete
                  </button>
                  {prod.status !== "approved" && prod.status !== "pending" && (
                    <button
                      className="btn btn-sm btn-warning me-2 m-2"
                      onClick={() => handleSendForApproval(prod.id)}>
                      Send for Approval
                    </button>
                  )}
                  <p className="mt-2">
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        prod.status === "approved"
                          ? "text-success"
                          : prod.status === "pending"
                          ? "text-warning"
                          : "text-muted"
                      }>
                      {prod.status || "Not Submitted"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyProducts;
