// src/pages/Auth/Register.js
import React, { useState } from "react";
import { register } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(username, password, role);
    if (result.success) {
      // Auto‑logged in: redirect by role
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "farmer") navigate("/farmer/dashboard");
      else navigate("/customer/dashboard");
    } else {
      setError(result.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Role</label>
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}>
            <option value="customer">Customer</option>
            <option value="farmer">Farmer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success w-100">
          Register
        </button>
      </form>
      <div className="text-center mt-3">
        <Link to="/login">Already have an Account? Login</Link>
      </div>
    </div>
  );
};

export default Register;
