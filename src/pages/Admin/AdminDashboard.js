import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem("products")) || []);
    setOrders(JSON.parse(localStorage.getItem("orders")) || []);
  }, []);

  // Helper function: count by status (case-insensitive)
  const countByStatus = (data, status) =>
    data.filter((item) => item.status?.toLowerCase() === status.toLowerCase())
      .length;

  // For "Completed", include both Delivered and Completed
  const completedCount = orders.filter((item) =>
    ["delivered", "completed"].includes(item.status?.toLowerCase())
  ).length;

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      {/* Product Summary Cards */}
      <div className="row mt-4">
        <h4>Product Status Summary</h4>
        <div className="col-md-4">
          <div className="card text-white bg-warning mb-3">
            <div className="card-body">
              <h5 className="card-title">Pending</h5>
              <p className="card-text display-6">
                {countByStatus(products, "pending")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-body">
              <h5 className="card-title">Approved</h5>
              <p className="card-text display-6">
                {countByStatus(products, "approved")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-white bg-danger mb-3">
            <div className="card-body">
              <h5 className="card-title">Rejected</h5>
              <p className="card-text display-6">
                {countByStatus(products, "rejected")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary Cards - Single Row */}
      <div className="row mt-4">
        <h4>Order Status Summary</h4>
        <div className="col-md-2">
          <div className="card bg-primary text-white mb-3">
            <div className="card-body">
              <h5 className="card-title">Order Received</h5>
              <p className="card-text display-6">
                {countByStatus(orders, "Order Received")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-info text-white mb-3">
            <div className="card-body">
              <h5 className="card-title">Packed</h5>
              <p className="card-text display-6">
                {countByStatus(orders, "Packed")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-warning text-dark mb-3">
            <div className="card-body">
              <h5 className="card-title">Out for Delivery</h5>
              <p className="card-text display-6">
                {countByStatus(orders, "Out for Delivery")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-success text-white mb-3">
            <div className="card-body">
              <h5 className="card-title">Delivered</h5>
              <p className="card-text display-6">
                {countByStatus(orders, "Delivered")}
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-2">
          <div className="card bg-dark text-white mb-3">
            <div className="card-body">
              <h5 className="card-title">Completed</h5>
              <p className="card-text display-6">{completedCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
