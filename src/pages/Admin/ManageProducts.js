import React, { useEffect, useState } from "react";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const handleStatusChange = (id, newStatus) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const renderProductRow = (product) => (
    <tr key={product.id}>
      <td>
        {product.image && (
          <img src={product.image} alt="product" width="60" height="60" />
        )}
      </td>
      <td>{product.name}</td>
      <td>{product.farmerName || "N/A"}</td>
      <td>
        {product.quantity} {product.quantityUnit}
      </td>
      <td>₹{product.price}</td>
      <td>{product.location}</td>
      <td>
        {product.status === "pending" ? (
          <>
            <button
              className="btn btn-sm btn-success me-2"
              onClick={() => handleStatusChange(product.id, "approved")}>
              Approve
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleStatusChange(product.id, "rejected")}>
              Reject
            </button>
          </>
        ) : (
          product.status.charAt(0).toUpperCase() + product.status.slice(1)
        )}
      </td>
    </tr>
  );

  const pendingProducts = products.filter((p) => p.status === "pending");
  const reviewedProducts = products.filter(
    (p) => p.status === "approved" || p.status === "rejected"
  );

  return (
    <div className="container mt-4">
      <h2>Manage Products</h2>

      {/* Pending Products Section */}
      <h4 className="mt-4">Pending for Approval</h4>
      {pendingProducts.length === 0 ? (
        <p>No pending products.</p>
      ) : (
        <table className="table table-striped mt-2">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Farmer</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{pendingProducts.map(renderProductRow)}</tbody>
        </table>
      )}

      {/* Approved/Rejected Products Section */}
      <h4 className="mt-5">Approved / Rejected Products</h4>
      {reviewedProducts.length === 0 ? (
        <p>No approved or rejected products.</p>
      ) : (
        <table className="table table-striped mt-2">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Farmer</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{reviewedProducts.map(renderProductRow)}</tbody>
        </table>
      )}
    </div>
  );
};

export default ManageProducts;
