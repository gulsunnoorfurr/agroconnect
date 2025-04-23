// src/pages/Farmer/FarmerDashboard.js
import React from "react";
import { Link } from "react-router-dom";

const FarmerDashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center">Farmer Dashboard</h2>
      <div className="d-flex flex-column gap-3 mt-4">
        <Link to="/farmer/add-product" className="btn btn-success">
          Add New Product
        </Link>
        <Link to="/farmer/my-products" className="btn btn-outline-success">
          View My Products
        </Link>
      </div>
    </div>
  );
};

export default FarmerDashboard;
