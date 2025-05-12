// src/components/Navbar.js
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user); // Debug user state
  }, [user]);

  const handleLogout = async () => {
    await logout(); // ensure logout completes
    navigate("/"); // redirect to homepage
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
      <Link className="navbar-brand" to={user ? "/redirect" : "/"}>
        AgroConnect
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          {!user && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}

          {user && user.role === "customer" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  My Cart
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/order-status">
                  Check Order Status
                </Link>
              </li>
            </>
          )}

          {user && user.role === "farmer" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/farmer/add-product">
                  Add Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/farmer/my-products">
                  My Products
                </Link>
              </li>
            </>
          )}

          {user && user.role === "admin" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/manage-orders">
                  Manage Orders
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin/manage-products">
                  Manage Products
                </Link>
              </li>
            </>
          )}
        </ul>

        {user && (
          <div className="d-flex align-items-center">
            <span className="text-white me-3">{user.username}</span>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
